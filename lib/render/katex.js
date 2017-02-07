'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderTexBlock = exports.renderTexInline = exports.renderAsciimathInline = undefined;

var _asciimathToLatex = require('asciimath-to-latex');

var _asciimathToLatex2 = _interopRequireDefault(_asciimathToLatex);

var _katex = require('katex');

var _katex2 = _interopRequireDefault(_katex);

require('katex/dist/katex.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function renderAsciimathInline() {
  var code = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  try {
    var texCode = (0, _asciimathToLatex2.default)(code);
    return renderTexInline(texCode);
  } catch (err) {
    return '<code>' + err + '</code>';
  }
}

function renderTexInline() {
  var code = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  try {
    var htmlCode = _katex2.default.renderToString(code);
    return htmlCode;
  } catch (err) {
    return '<code>' + err + '</code>';
  }
}

function renderTexBlock() {
  var code = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  var lines = code.split(/(?:\n\s*){2,}/);

  // consecutive new lines means a new formula
  var tex = _.reduce(lines, function (result, line) {
    try {
      result += _katex2.default.renderToString(line, { displayMode: true });
    } catch (err) {
      result += '<pre>' + err + '</pre>';
    }
    return result;
  }, '');

  return '<div>' + tex + '</div>';
}

exports.renderAsciimathInline = renderAsciimathInline;
exports.renderTexInline = renderTexInline;
exports.renderTexBlock = renderTexBlock;