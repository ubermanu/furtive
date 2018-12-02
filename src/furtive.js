import {version} from '../package.json'
import pseudos from './pseudos.js';

/**
 * This function will bind all the main watcher to all the container elements.
 *
 * @private
 */
let Furtive = function ($container) {

    const condition = 'data-furtive-condition'
    const conjunction = 'data-furtive-conjunction'
    const disabled = 'data-furtive-disabled'
    const required = 'data-furtive-required'

    // Use an internal copy of jQuery at this point (to avoid conflict with other pseudos)
    const _jQuery = jQuery
    _jQuery.extend(jQuery.expr[':'], window.Furtive.pseudos)

    let watcher = function () {
        $container.find('[' + condition + ']').each(function (k, item) {

            let cond = $(item).attr(condition)
            let conj = $(item).attr(conjunction)
            let $item = $(item)

            if (cond !== undefined && cond.length) {

                // Extract selectors from the given condition
                let selectors = cond.match(/('.*?'|[^',]+)+(?=\s*|\s*$)/g)
                let matches = 0

                for (let i = 0, l = selectors.length; i < l; i++) {
                    if (_jQuery(selectors[i]).length) {
                        matches++;
                    }
                }

                let visible = (conj && conj.toLowerCase() === 'and')
                    ? matches === selectors.length
                    : matches > 0

                $item.toggle(visible)

                if (false !== window.Furtive.disableHidden) {
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
 * Initialize the Furtive plugin on the selection.
 *
 * @public
 */
$.fn.furtive = function () {

    if (this.length > 1) {
        this.each(function () {
            $(this).furtive()
        })
    }

    if (this.length === 1) {
        Furtive($(this))
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
if ('undefined' === typeof window.Furtive) {
    window.Furtive = {
        'autoBind': true,
        'disableHidden': true,
        'pseudos': pseudos,
        'version': version
    }
}

/**
 * Auto-binding can be prevented by settings the "window.Furtive.autoBind" value to FALSE.
 */
if (false !== window.Furtive.autoBind) {
    $(function () {
        if ($('[data-furtive-watch]').length) {
            $('[data-furtive-watch]').furtive()
        }
    })
}
