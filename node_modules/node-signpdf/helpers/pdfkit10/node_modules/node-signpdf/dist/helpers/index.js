"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "extractSignature", {
  enumerable: true,
  get: function () {
    return _extractSignature.default;
  }
});
Object.defineProperty(exports, "removeTrailingNewLine", {
  enumerable: true,
  get: function () {
    return _removeTrailingNewLine.default;
  }
});

var _extractSignature = _interopRequireDefault(require("./extractSignature"));

var _removeTrailingNewLine = _interopRequireDefault(require("./removeTrailingNewLine"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

'This string is added so that jest collects coverage for this file'; // eslint-disable-line