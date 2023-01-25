import $ from 'jquery'
import Furtive from './furtive.js'
import { version } from '../package.json' assert { type: 'json' }

/**
 * Initialize the Furtive plugin on the selection.
 * @public
 */
$.fn.furtive = function (options) {
  if (this.length > 1) {
    this.each(function () {
      $(this).furtive(options)
    })
  }

  if (this.length === 1) {
    Furtive($(this), options)
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
window.Furtive = $.extend({}, { autoBind: true }, window.Furtive || {}, { version })

/**
 * Auto-binding can be prevented by settings the "window.Furtive.autoBind" value to FALSE.
 */
$(function () {
  if (window.Furtive.autoBind) {
    $('[data-furtive-watch]').furtive()
  }
})
