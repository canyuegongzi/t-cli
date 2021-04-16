"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var https = require('https');

var path = require("path");

var fs = require("fs");

var ora = require('ora');

var log = require('../utils/log');

var configUrl = 'https://gitee.com/canyuegongzi/t-cli-templatt-cli-templatee/raw/t-cli-template-config/t-cli-templatt-cli-templatee.json';
/**
 * 获取模板
 * @param options
 * @param context
 * @returns {Promise<void>}
 */

function getList() {
  return _getList.apply(this, arguments);
}
/**
 * 更新模板
 * @param data
 * @returns {Promise<void>}
 */


function _getList() {
  _getList = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var options,
        context,
        _args = arguments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
            context = _args.length > 1 && _args[1] !== undefined ? _args[1] : process.cwd();
            return _context.abrupt("return", new Promise(function (resolve) {
              https.get(configUrl, function (response) {
                var data = '';
                response.on('data', function (chunk) {
                  data += chunk;
                });
                response.on('end', function () {
                  resolve(JSON.parse(data));
                });
              }).on("error", function (error) {
                log('ERROR', error.message);
              });
            }));

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getList.apply(this, arguments);
}

function update(_x) {
  return _update.apply(this, arguments);
}

function _update() {
  _update = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(data) {
    var updateSpinner, errorCallback;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            updateSpinner = ora({
              text: 'start update config...',
              color: 'blue'
            }).start();

            errorCallback = function errorCallback(err) {
              updateSpinner.fail('update fail!!!!');
              log('ERROR', err);
            };

            return _context3.abrupt("return", new Promise( /*#__PURE__*/function () {
              var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(resolve) {
                var configData;
                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return getList();

                      case 2:
                        configData = _context2.sent;
                        // 修改类型配置文件
                        fs.readFile(path.join(__dirname, '../config/', 'category.json'), 'utf8', function (err, fileData) {
                          if (err) {
                            errorCallback(err);
                            resolve(false);
                          }

                          var packageFile = {
                            categoryList: configData.categoryList
                          };
                          fs.writeFile(path.join(__dirname, '../config/', 'category.json'), JSON.stringify(packageFile, null, 4), 'utf8', function (err) {
                            if (err) {
                              errorCallback(err);
                              resolve(false);
                            }

                            fs.readFile(path.join(__dirname, '../config/', 'template.json'), 'utf8', function (err, fileData) {
                              if (err) {
                                errorCallback(err);
                                resolve(false);
                              }

                              var packageFile = {
                                categoryList: configData.templateList
                              };
                              fs.writeFile(path.join(__dirname, '../config/', 'template.json'), JSON.stringify(packageFile, null, 4), 'utf8', function (err) {
                                if (err) {
                                  errorCallback(err);
                                  resolve(false);
                                }

                                updateSpinner.succeed('update success!!!');
                                resolve(true);
                              });
                            });
                          });
                        });

                      case 4:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x2) {
                return _ref.apply(this, arguments);
              };
            }()));

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _update.apply(this, arguments);
}

module.exports = function () {
  return update.apply(void 0, arguments)["catch"](function (err) {});
};