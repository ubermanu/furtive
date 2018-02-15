;(function (window) {

    /**
     * This function will bind all the main watcher to all the container elements.
     * @private
     */
    var Reveal = function ($container) {

        var condition = 'data-reveal-condition';
        var conjunction = 'data-reveal-conjunction';
        var disabled = 'data-reveal-disabled';

        // Use an internal copy of jQuery at this point (to avoid conflict with other pseudos)
        var _jQuery = jQuery;
        _jQuery.extend(jQuery.expr[':'], window.Reveal.pseudos);

        var watcher = function () {
            $container.find('[' + condition + ']').each(function (k, item) {

                var cond = _jQuery(item).attr(condition);
                var conj = _jQuery(item).attr(conjunction);
                var $item = $(item);

                if (cond !== undefined) {

                    // Strip contained quoted strings
                    var condCount = cond.replace(/'((?:\\.|[^'\\])*)'/g, '').split(',').length;

                    var visible = (conj && conj.toLowerCase() === 'and')
                        ? $container.find(cond).length === condCount
                        : $container.find(cond).length > 0;

                    $item.toggle(visible);

                    if (false !== window.Reveal.disableHidden) {
                        $item.find(':input').each(function (z, input) {

                            var $input = $(input);

                            // Stash the old disabled property and apply new one
                            if (!visible && $input.attr(disabled) === undefined) {
                                $input.attr(disabled, $input.prop('disabled'));
                                $input.attr('disabled', true);
                            }

                            // Re-apply the old disabled property
                            if (visible) {
                                $input.prop('disabled', $input.attr(disabled) === 'true');
                                $input.removeAttr(disabled)
                            }
                        });
                    }
                }
            });
        };

        $container
            .find(':checkbox, :radio, :file, select')
            .change(watcher)
            .triggerHandler('change');

        $container
            .find(':text, textarea')
            .keyup(watcher)
            .triggerHandler('keyup');
    };

    /**
     * Initialize the Reveal plugin on the selection.
     *
     * @returns {Array}
     * @constructor
     */
    $.fn.reveal = function () {

        if (this.length > 1) {
            this.each(function () {
                $(this).reveal();
            });
        }

        if (this.length === 1) {
            Reveal($(this));
        }
    };

    /**
     * Ensure the extension is now defined if it wasn't previously.
     * Auto binding is set to TRUE by default.
     * Disable hidden <input> elements is set to TRUE by default.
     * Custom "pseudos" can be added as well.
     */
    if ('undefined' === typeof window.Reveal) {
        window.Reveal = {
            'autoBind': true,
            'disableHidden': true,
            'pseudos': {
                'equals': function (e, index, parts) {
                    return $(e).val() === parts[3];
                },
                'filled': function (e) {
                    return $(e).val().length > 0;
                }
            }
        };
    }

    /**
     * Auto-binding can be prevented by settings the "window.Reveal.autoBind" value to FALSE.
     */
    if (false !== window.Reveal.autoBind) {
        $(function () {
            if ($('[data-reveal-watch]').length) {
                $('[data-reveal-watch]').reveal();
            }
        });
    }

}(window));