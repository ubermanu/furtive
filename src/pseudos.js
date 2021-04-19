/**
 * These are additional pseudos for the jQuery selector.
 * It's possible to add more in the object "window.Furtive.pseudos" if needed.
 */
export default {
  /**
   * @param e
   * @param index
   * @param parts
   * @return {boolean}
   */
  equals: function (e, index, parts) {
    return $(e).val() === parts[3];
  },

  /**
   * @param e
   * @return {boolean}
   */
  filled: function (e) {
    return $(e).val().length > 0;
  },

  /**
   * @param e
   * @param index
   * @param parts
   * @return {boolean}
   */
  contains: function (e, index, parts) {
    return $(e).val().indexOf(parts[3]) > -1;
  },

  /**
   * @param e
   * @param index
   * @param parts
   * @return {boolean}
   */
  gt: function (e, index, parts) {
    return +$(e).val() > +parts[3];
  },

  /**
   * @param e
   * @param index
   * @param parts
   * @return {boolean}
   */
  gte: function (e, index, parts) {
    return +$(e).val() >= +parts[3];
  },

  /**
   * @param e
   * @param index
   * @param parts
   * @return {boolean}
   */
  lt: function (e, index, parts) {
    return +$(e).val() < +parts[3];
  },

  /**
   * @param e
   * @param index
   * @param parts
   * @return {boolean}
   */
  lte: function (e, index, parts) {
    return +$(e).val() <= +parts[3];
  },
};
