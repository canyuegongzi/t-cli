"use strict";

/**
 * 日志打印
 * @param type
 * @param str
 */
function log(type, str) {
  console.log(str);
}

module.exports = function () {
  return log.apply(void 0, arguments)["catch"](function (err) {});
};