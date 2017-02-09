const regex = /^(?:(\d\d?\/\d\d?\/\d*), (\d\d?:\d\d?) - (?:(.*): )?)?(.*)$/;
exports.regex = regex;

/**
 * Middleware that filters out the messages from WhatsApp's Email export
 *
 * @param {string} line Message
 */
module.exports = (line) => {
  const result = regex.exec(line);
  return result[4] === '<Media omitted>' ? '' : result[4];
};
