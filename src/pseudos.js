/**
 * These are additional pseudos for the jQuery selector.
 * It's possible to add more in the object "window.Reveal.pseudos" if needed.
 *
 * @private
 */
export default {

    'equals': function (e, index, parts) {
        return $(e).val() === parts[3]
    },

    'filled': function (e) {
        return $(e).val().length > 0
    },

    'contains': function (e, index, parts) {
        return $(e).val().indexOf(parts[3]) > -1
    },

    'gt': function (e, index, parts) {
        return +$(e).val() > +parts[3]
    },

    'gte': function (e, index, parts) {
        return +$(e).val() >= +parts[3]
    },

    'lt': function (e, index, parts) {
        return +$(e).val() < +parts[3]
    },

    'lte': function (e, index, parts) {
        return +$(e).val() <= +parts[3]
    }
}
