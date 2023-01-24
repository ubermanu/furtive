import $ from 'jquery'

const condition = 'data-furtive-condition'
const conjunction = 'data-furtive-conjunction'
const disabled = 'data-furtive-disabled'
const required = 'data-furtive-required'
const hidden = 'data-furtive-hidden'

/**
 * When a change is detected into the sub-elements, the watcher will be triggered.
 * Re-evaluate the condition and show/hide the element accordingly.
 * @private
 */
const update = ($container) => () => {
  // Use an internal copy of jQuery at this point (to avoid conflict with other pseudos)
  const _jQuery = $
  _jQuery.extend($.expr[':'], window.Furtive.pseudos)

  $container.find('[' + condition + ']').each((k, item) => {
    let cond = $(item).attr(condition)
    let conj = $(item).attr(conjunction)
    let $item = $(item)

    // If the condition is empty, show the element
    if (cond === undefined || !cond.length) {
      $item.attr(hidden, false)
      return
    }

    // Extract selectors from the given condition
    let selectors = cond.match(/('.*?'|[^',]+)+(?=\s*|\s*$)/g)
    let matches = 0

    for (let i = 0, l = selectors.length; i < l; i++) {
      if (_jQuery(selectors[i]).length) {
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
    $item.attr(hidden, !visible)

    // Disable/enable the hidden <input> elements
    // This is useful to prevent the browser to validate the form with hidden fields
    if (window.Furtive.disableHidden) {
      $item.find(':input').each((z, input) => {
        let $input = $(input)

        // Stash the old disabled and require properties and apply new one
        if (!visible) {
          if ($input.attr(disabled) === undefined) {
            $input.attr(disabled, $input.prop('disabled'))
            $input.prop('disabled', true)
          }

          if ($input.attr(required) === undefined) {
            $input.attr(required, $input.prop('required'))
            $input.prop('required', false)
          }
        }

        // Re-apply the old disabled and required properties
        if (visible) {
          $input.prop('disabled', $input.attr(disabled) === 'true')
          $input.removeAttr(disabled)

          $input.prop('required', $input.attr(required) === 'true')
          $input.removeAttr(required)
        }
      })
    }
  })
}

/**
 * Return the start function.
 * This function will bind all the main watcher to all the container elements.
 *
 * @param {jQuery} $container
 */
export default ($container) => {
  $container
    .find(':checkbox, :radio, :file, select')
    .on('change', update($container))
    .triggerHandler('change')

  $container
    .find(':text, textarea')
    .on('keyup', update($container))
    .triggerHandler('keyup')
}
