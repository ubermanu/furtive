import $ from 'jquery'

const CONDITION_ATTR = 'data-furtive-condition'
const CONJUNCTION_ATTR = 'data-furtive-conjunction'
const DISABLED_ATTR = 'data-furtive-disabled'
const REQUIRED_ATTR = 'data-furtive-required'
const HIDDEN_ATTR = 'data-furtive-hidden'

/**
 * When a change is detected into the sub-elements, the watcher will be triggered.
 * Re-evaluate the condition and show/hide the element accordingly.
 * @private
 */
const update = (container) => () => {
  // Use an internal copy of jQuery at this point (to avoid conflict with other pseudos)
  const validator = $
  validator.extend($.expr[':'], window.Furtive.pseudos)

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
    let selectors = cond.match(/('.*?'|[^',]+)+(?=\s*|\s*$)/g)
    let matches = 0

    for (let i = 0, l = selectors.length; i < l; i++) {
      if (validator(selectors[i]).length) {
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
    if (window.Furtive.disableHidden) {
      const children = Array.from($item.find(':input'))

      // If the element is an input, add it to the list
      if ($item.is(':input')) {
        children.push($item)
      }

      for (let i = 0, l = children.length; i < l; i++) {
        if (!visible) {
          disableElement(children[i])
        } else {
          enableElement(children[i])
        }
      }
    }
  })
}

/**
 * Disable the given element and store the current state into the element's attributes.
 * This will allow to re-enable the element later.
 * @param el
 */
const disableElement = (el) => {
  if (el.attr(DISABLED_ATTR) === undefined) {
    el.attr(DISABLED_ATTR, el.prop('disabled'))
    el.prop('disabled', true)
  }

  if (el.attr(REQUIRED_ATTR) === undefined) {
    el.attr(REQUIRED_ATTR, el.prop('required'))
    el.prop('required', false)
  }
}

/**
 * Enable the element and remove the stored state from the element's attributes.
 * @param el
 */
const enableElement = (el) => {
  el.prop('disabled', el.attr(DISABLED_ATTR) === 'true')
  el.removeAttr(DISABLED_ATTR)

  el.prop('required', el.attr(REQUIRED_ATTR) === 'true')
  el.removeAttr(REQUIRED_ATTR)
}

/**
 * Return the start function.
 * This function will bind all the main watcher to all the container elements.
 *
 * @param {jQuery} container
 */
export default (container) => {
  container.on('change', '*', update(container))
  update(container)()
}
