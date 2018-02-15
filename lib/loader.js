"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (content) {
  var _this = this;

  var loaderOpts = _loaderUtils2.default.getOptions(this) || {};

  if (loaderOpts.match && !loaderOpts.match.test(this._module.issuer.userRequest)) {
    this.callback(null, content);
    return;
  }

  var cb = this.async();

  Promise.resolve(String(content)).then(function (content) {
    if ((0, _isSvg2.default)(content)) {
      return content;
    }

    return new Promise(function (resolve, reject) {
      _fs2.default.readFile(_this.resourcePath, "utf-8", function (err, data) {
        if (err !== null) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }).then((0, _reactSvgCore.optimize)(loaderOpts.svgo)).then((0, _reactSvgCore.transform)({ jsx: loaderOpts.jsx })).then(function (result) {
    return cb(null, result.code);
  }).catch(function (err) {
    return cb(err);
  });
};

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _isSvg = require("is-svg");

var _isSvg2 = _interopRequireDefault(_isSvg);

var _loaderUtils = require("loader-utils");

var _loaderUtils2 = _interopRequireDefault(_loaderUtils);

var _reactSvgCore = require("react-svg-core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports["default"];
