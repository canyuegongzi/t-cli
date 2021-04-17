"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var templateList = require('../config/template.json').templateList;

var log = require('../utils/log');

var category = 'category';
/**
 * 列出模板列表
 * @param options
 * @param context
 * @returns {Promise<void>}
 */

function list() {
  return _list.apply(this, arguments);
}

function _list() {
  _list = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var options,
        context,
        projectCategory,
        templateLogList,
        i,
        str,
        _args = arguments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
            context = _args.length > 1 && _args[1] !== undefined ? _args[1] : process.cwd();
            projectCategory = options[category];
            templateLogList = templateList;

            if (projectCategory) {
              templateLogList = templateList.filter(function (item) {
                return item.type === projectCategory;
              });
            }

            for (i = 0; i <= templateLogList.length; i++) {
              str = "".concat(templateLogList[i].name, ":").concat(templateLogList[i].description);
              log('SUCCESS', str);
            }

            if (!templateLogList.length) {
              log('WARING', 'no template');
            }

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _list.apply(this, arguments);
}

module.exports = function () {
  return list.apply(void 0, arguments)["catch"](function (err) {});
};