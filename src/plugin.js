import $ from 'jquery'
import Furtive from './furtive.js'
import pseudos from './pseudos.js'
import { version } from '../package.json' assert { type: 'json' }

/**
 * Initialize the Furtive plugin on the selection.
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
    autoBind: true,
    disableHidden: true,
    pseudos,
    version,
  }
}

/**
 * Auto-binding can be prevented by settings the "window.Furtive.autoBind" value to FALSE.
 */
if (false !== window.Furtive.autoBind) {
  $(function () {
    const el = $('[data-furtive-watch]')
    return el.length && el.furtive()
  })
}
