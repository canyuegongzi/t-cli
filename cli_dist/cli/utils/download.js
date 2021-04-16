"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var download = require("download-git-repo");

var path = require("path");

var rimraf = require("rimraf");

var log = require('./log');
/**
 * 下载文件到目录
 * @param url
 * @param name
 * @param target
 * @returns {Promise<void>}
 */


function downloadFile(_x, _x2) {
  return _downloadFile.apply(this, arguments);
}

function _downloadFile() {
  _downloadFile = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(url, name) {
    var target,
        _args = arguments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            target = _args.length > 2 && _args[2] !== undefined ? _args[2] : process.cwd();
            return _context.abrupt("return", new Promise(function (resolve, reject) {
              var dir = path.join(process.cwd(), name);
              rimraf.sync(dir, {});

              var downLoadCallback = function downLoadCallback(err) {
                if (err) {
                  resolve({
                    flag: false,
                    dir: dir,
                    name: name
                  });
                  log('ERROR', err);
                }

                resolve({
                  flag: true,
                  dir: dir,
                  name: name
                });
              };

              download(url, dir, {
                clone: true
              }, downLoadCallback);
            }));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _downloadFile.apply(this, arguments);
}

module.exports = downloadFile;