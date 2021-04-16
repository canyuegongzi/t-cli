"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var templateList = require('../config/template.json').templateList;

var categoryList = require('../config/category.json').categoryList;

var log = require('../utils/log');

var inquirer = require('inquirer');

var fs = require("fs");

var ora = require('ora');

var downloadFile = require("../utils/download");

var template = 'template';
var category = 'category';
/**
 * 初始化工程模板
 * @param pluginToAdd
 * @param options
 * @param context
 * @returns {Promise<void>}
 */

function init(_x) {
  return _init.apply(this, arguments);
}
/**
 * 选择工程类型
 * @returns {Promise<void>}
 */


function _init() {
  _init = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(pluginToAdd) {
    var options,
        context,
        projectCategory,
        projectTemplate,
        projectName,
        templateInfo,
        url,
        packageInfo,
        downloadSpinner,
        _yield$downloadFile,
        dir,
        name,
        flag,
        editConfigSpinner,
        successFlag,
        _args = arguments;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
            context = _args.length > 2 && _args[2] !== undefined ? _args[2] : process.cwd();
            projectCategory = options[category];
            projectTemplate = options[template];
            projectName = pluginToAdd;

            if (options.hasOwnProperty(category)) {
              _context.next = 9;
              break;
            }

            _context.next = 8;
            return selectCategory();

          case 8:
            projectCategory = _context.sent;

          case 9:
            if (options.hasOwnProperty(template)) {
              _context.next = 13;
              break;
            }

            _context.next = 12;
            return selectTemplate(projectCategory);

          case 12:
            projectTemplate = _context.sent;

          case 13:
            templateInfo = templateList.find(function (item) {
              return item.type === projectCategory && item.name === projectTemplate;
            });

            if (templateInfo) {
              _context.next = 16;
              break;
            }

            return _context.abrupt("return", log('WARING', 'no template'));

          case 16:
            url = templateInfo.url;
            _context.next = 19;
            return getUserInputPackageMessage(projectName);

          case 19:
            packageInfo = _context.sent;
            downloadSpinner = ora({
              text: 'start download template...',
              color: 'blue'
            }).start();
            _context.next = 23;
            return downloadFile(url[0], projectName);

          case 23:
            _yield$downloadFile = _context.sent;
            dir = _yield$downloadFile.dir;
            name = _yield$downloadFile.name;
            flag = _yield$downloadFile.flag;

            if (!flag) {
              _context.next = 36;
              break;
            }

            downloadSpinner.succeed('download success');
            editConfigSpinner = ora({
              text: 'start edit config...',
              color: 'blue'
            }).start(); // 下载完成后修改配置信息

            _context.next = 32;
            return downloadSuccess(dir, name, packageInfo);

          case 32:
            successFlag = _context.sent;

            if (successFlag) {
              editConfigSpinner.succeed('create success');
            } else {
              editConfigSpinner.fail('create fail');
            }

            _context.next = 37;
            break;

          case 36:
            downloadSpinner.fail('download fail');

          case 37:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _init.apply(this, arguments);
}

function selectCategory() {
  return _selectCategory.apply(this, arguments);
}
/**
 * 选择工程模板名称
 * @returns {Promise<void>}
 */


function _selectCategory() {
  _selectCategory = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", new Promise(function (resolve) {
              inquirer.prompt([{
                type: 'list',
                message: 'please select category:',
                name: category,
                choices: categoryList
              }]).then(function (answers) {
                resolve(answers[category]);
              });
            }));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _selectCategory.apply(this, arguments);
}

function selectTemplate(_x2) {
  return _selectTemplate.apply(this, arguments);
}
/**
 * 模板下载成功
 * @param dir
 * @param name
 * @param packageInfo
 * @returns {Promise<void>}
 */


function _selectTemplate() {
  _selectTemplate = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(projectCategory) {
    var list;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            list = templateList.filter(function (item) {
              return item.type === projectCategory;
            }).map(function (item) {
              return item.name;
            });

            if (!(!list.length || !list)) {
              _context3.next = 4;
              break;
            }

            return _context3.abrupt("return", log('WARING', 'no template'));

          case 4:
            return _context3.abrupt("return", new Promise(function (resolve) {
              inquirer.prompt([{
                type: 'list',
                message: 'please select template:',
                name: template,
                choices: list
              }]).then(function (answers) {
                resolve(answers[template]);
              });
            }));

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            log('ERROR', _context3.t0);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 7]]);
  }));
  return _selectTemplate.apply(this, arguments);
}

function downloadSuccess(_x3, _x4, _x5) {
  return _downloadSuccess.apply(this, arguments);
}
/**
 * 用户自己输入一些配置信息
 * @param name
 * @returns {Promise<void>}
 */


function _downloadSuccess() {
  _downloadSuccess = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(dir, name, packageInfo) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt("return", new Promise(function (resolve) {
              fs.readFile(dir + '/package.json', 'utf8', function (err, data) {
                if (err) {
                  resolve(false);
                }

                var packageFile = _objectSpread(_objectSpread({}, JSON.parse(data)), packageInfo);

                fs.writeFile(dir + '/package.json', JSON.stringify(packageFile, null, 4), 'utf8', function (err) {
                  if (err) {
                    resolve(false);
                  }

                  resolve(true);
                });
              });
            }));

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _downloadSuccess.apply(this, arguments);
}

function getUserInputPackageMessage(_x6) {
  return _getUserInputPackageMessage.apply(this, arguments);
}

function _getUserInputPackageMessage() {
  _getUserInputPackageMessage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(name) {
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            return _context6.abrupt("return", new Promise( /*#__PURE__*/function () {
              var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(resolve, reject) {
                var messageInfoList;
                return _regenerator["default"].wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        _context5.prev = 0;
                        _context5.next = 3;
                        return Promise.all([inquirer.prompt([{
                          type: 'input',
                          message: "what's your name?",
                          name: 'author',
                          "default": ''
                        }, {
                          type: 'input',
                          message: "please enter version?",
                          name: 'version',
                          "default": '1.0.0'
                        }, {
                          type: 'input',
                          message: "please enter description.",
                          name: 'description',
                          "default": ''
                        }])]);

                      case 3:
                        messageInfoList = _context5.sent;
                        resolve(_objectSpread(_objectSpread({}, messageInfoList[0]), {}, {
                          name: name
                        }));
                        _context5.next = 10;
                        break;

                      case 7:
                        _context5.prev = 7;
                        _context5.t0 = _context5["catch"](0);
                        resolve({
                          name: name,
                          author: '',
                          description: '',
                          version: '1.0.0'
                        });

                      case 10:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5, null, [[0, 7]]);
              }));

              return function (_x7, _x8) {
                return _ref.apply(this, arguments);
              };
            }()));

          case 1:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _getUserInputPackageMessage.apply(this, arguments);
}

module.exports = function () {
  return init.apply(void 0, arguments)["catch"](function (err) {});
};