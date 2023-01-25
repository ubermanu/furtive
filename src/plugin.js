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
 * Auto binding is set to TRUE by default.
 * Disable hidden <input> elements is set to TRUE by default.
 * Custom "pseudos" can be added as well.
 * @type {{autoBind: boolean, disableHidden: boolean, pseudos: {}}}
 */
const globalOptions = {
  autoBind: true,
  pseudos: {},
  disableHidden: true,
}

/**
 * Ensure the extension is now defined if it wasn't previously.
 * @public
 */
window.Furtive = $.extend({}, globalOptions, window.Furtive || {}, { version })

/**
 * Auto-binding can be prevented by settings the "window.Furtive.autoBind" value to FALSE.
 */
$(function () {
  if (typeof window.Furtive !== 'undefined' || window.Furtive.autoBind) {
    $('[data-furtive-watch]').furtive(window.Furtive || {})
  }
})
