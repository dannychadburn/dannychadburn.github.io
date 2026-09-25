/* Email Impact - a transparent estimate for message carbon.
 * Gmail signatures cannot run this automatically. Use this helper in a
 * browser extension, Gmail add-on or mail client integration.
 */
(function (root) {
  'use strict';

  function estimate(input) {
    var recipients = Math.max(1, Number(input.recipients) || 1);
    var attachmentMB = Math.max(0, Number(input.attachmentMB) || 0);
    var grams = 4 + (recipients * 2) + (recipients * attachmentMB * 5);
    var miles = grams / 404;
    var phoneHours = grams / 7.5;
    var plasticBags = grams / 10;

    function formatShort(value) {
      return value < 1 ? value.toFixed(2) : value.toFixed(1);
    }

    var comparison = 'About the same as driving ' + formatShort(miles) + ' miles, charging a smartphone for ' + formatShort(phoneHours) + ' hours, or producing ' + plasticBags.toFixed(0) + ' single-use plastic bags.';

    return {
      grams: Math.round(grams * 10) / 10,
      comparison: comparison
    };
  }

  root.EmailImpact = { estimate: estimate };
}(window));
