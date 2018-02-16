import {version} from '../package.json'
import pseudos from './pseudos.js';

/**
 * This function will bind all the main watcher to all the container elements.
 *
 * @private
 */
let Reveal = function ($container) {

    const condition = 'data-reveal-condition'
    const conjunction = 'data-reveal-conjunction'
    const disabled = 'data-reveal-disabled'
    const required = 'data-reveal-required'

    // Use an internal copy of jQuery at this point (to avoid conflict with other pseudos)
    const _jQuery = jQuery
    _jQuery.extend(jQuery.expr[':'], window.Reveal.pseudos)

    let watcher = function () {
        $container.find('[' + condition + ']').each(function (k, item) {

            let cond = _jQuery(item).attr(condition)
            let conj = _jQuery(item).attr(conjunction)
            let $item = $(item)

            if (cond !== undefined && cond.length) {

                // Strip contained quoted strings
                let condCount = cond.replace(/'((?:\\.|[^'\\])*)'/g, '').split(',').length

                let visible = (conj && conj.toLowerCase() === 'and')
                    ? $container.find(cond).length === condCount
                    : $container.find(cond).length > 0

                $item.toggle(visible)

                if (false !== window.Reveal.disableHidden) {
                    $item.find(':input').each(function (z, input) {

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
            }
        })
    }

    $container
        .find(':checkbox, :radio, :file, select')
        .change(watcher)
        .triggerHandler('change')

    $container
        .find(':text, textarea')
        .keyup(watcher)
        .triggerHandler('keyup')
}

/**
 * Initialize the Reveal plugin on the selection.
 *
 * @public
 */
$.fn.reveal = function () {

    if (this.length > 1) {
        this.each(function () {
            $(this).reveal()
        })
    }

    if (this.length === 1) {
        Reveal($(this))
    }
}

/**
 * Ensure the extension is now defined if it wasn't previously.
 * Auto binding is set to TRUE by default.
 * Disable hidden <input> elements is set to TRUE by default.
 * Custom "pseudos" can be added as well.
 *
 * @public
 */
if ('undefined' === typeof window.Reveal) {
    window.Reveal = {
        'autoBind': true,
        'disableHidden': true,
        'pseudos': pseudos,
        'version': version
    }
}

/**
 * Auto-binding can be prevented by settings the "window.Reveal.autoBind" value to FALSE.
 */
if (false !== window.Reveal.autoBind) {
    $(function () {
        if ($('[data-reveal-watch]').length) {
            $('[data-reveal-watch]').reveal()
        }
    })
}
