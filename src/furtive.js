import $ from 'jquery'
import pseudos from './pseudos.js'

const CONDITION_ATTR = 'data-furtive-condition'
const CONJUNCTION_ATTR = 'data-furtive-conjunction'
const STATE_ATTR = 'data-furtive-state'
const HIDDEN_ATTR = 'data-furtive-hidden'

/**
 * Default options for the plugin.
 * @type {{disableHidden: boolean, pseudos: {}}}
 */
const defaultOptions = {
  disableHidden: true,
  pseudos: {},
}

/**
 * Returns a function that will update the visibility of the elements.
 * When a change is detected into the sub-elements, the watcher will be triggered.
 * Re-evaluate the condition and show/hide the element accordingly.
 * @private
 */
const createUpdateFunction = (container, options) => () => {
  // Use an internal copy of jQuery at this point (to avoid conflict with other pseudos)
  // TODO: Find a better way to do this
  const validator = $
  validator.extend($.expr[':'], pseudos, options.pseudos || {})

  const elements = container.find('[' + CONDITION_ATTR + ']')

  elements.each((k, item) => {
    const cond = $(item).attr(CONDITION_ATTR),
      conj = $(item).attr(CONJUNCTION_ATTR),
      $item = $(item)

    // If the condition is empty, show the element
    if (cond === undefined || !cond.length) {
      $item.attr(HIDDEN_ATTR, false)
      return
    }

    // Extract selectors from the given condition
    const selectors = cond.match(/('.*?'|[^',]+)+(?=\s*|\s*$)/g)
    let matches = 0

    for (let i = 0, l = selectors.length; i < l; i++) {
      if (validator(container).find(selectors[i]).length) {
        matches++
      }
    }

    // Resolve the visibility of the element according to the conjunction
    // and the number of matches from the condition
    const visible =
      conj && conj.toLowerCase() === 'and'
        ? matches === selectors.length
        : matches > 0

    // Set the custom "hidden" attribute to the element
    $item.attr(HIDDEN_ATTR, !visible)

    // Disable/enable the hidden <input> elements
    // This is useful to prevent the browser to validate the form with hidden fields
    if (options.disableHidden) {
      const children = $item.find(':input')

      // If the element is an input, add it to the list
      if ($item.is(':input')) {
        children.push($item)
      }

      children.each((k, item) => {
        if (visible) {
          enableElement($(item))
        } else {
          disableElement($(item))
        }
      })
    }
  })
}

/**
 * Disable the given element and store the current state into the element's attributes.
 * This will allow to re-enable the element later.
 * @param el
 */
const disableElement = (el) => {
  if (el.attr(STATE_ATTR)) {
    return
  }
  const state = {
    disabled: el.prop('disabled'),
    checked: el.prop('checked'),
    value: el.val(),
  }
  el.attr(STATE_ATTR, JSON.stringify(state))
  el.prop('disabled', true)
  el.prop('checked', false)
  el.val('')
}

/**
 * Enable the element and remove the stored state from the element's attributes.
 * @param el
 */
const enableElement = (el) => {
  if (!el.attr(STATE_ATTR)) {
    return
  }
  try {
    const state = JSON.parse(el.attr(STATE_ATTR))
    el.prop('disabled', state.disabled ?? false)
    el.prop('checked', state.checked ?? false)
    el.val(state.value ?? '')
  } catch (e) {
    // Do nothing
  }
  el.removeAttr(STATE_ATTR)
}

/**
 * Return the start function.
 * This function will bind the update function to the container elements events.
 *
 * @param {jQuery} container
 * @param options
 */
export default (container, options = {}) => {
  options = $.extend({}, defaultOptions, options)

  // Create the update function and bind it to the container events
  const update = createUpdateFunction(container, options)
  container.on('change, input', '*', update)
  container.on('furtive:refresh', update)

  // Run the update function once to initialize the elements
  update()
}
