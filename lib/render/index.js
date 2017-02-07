'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _markdownIt = require('markdown-it');

var _markdownIt2 = _interopRequireDefault(_markdownIt);

require('github-markdown-css/github-markdown.css');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _katex = require('./katex');

var _prism = require('./prism');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getMarkdown(options) {
  var defaultOptions = {
    html: true, // Enable HTML tags in source
    xhtmlOut: true, // Use '/' to close single tags (<br />).
    // This is only for full CommonMark compatibility.
    breaks: false, // Convert '\n' in paragraphs into <br>
    linkify: false, // Autoconvert URL-like text to links

    asciimath: true, // Convert AsciiMath to HTML.
    // Invalid when TeX is false.
    tex: true, // Convert TeX to HTML using KaTeX.

    prism: { // Options for Prism, the highlight renderer.
      theme: 'default' }
  };

  // https://markdown-it.github.io/markdown-it/
  var markdown = (0, _markdownIt2.default)(options || defaultOptions);

  // node_modules/markdown-it/lib/renderer.js
  var originRules = _lodash2.default.reduce(markdown.renderer.rules, function (accumulator, value, key) {
    if (typeof value === 'function') {
      accumulator[key] = value.bind(markdown.renderer.rules);
    }
    return accumulator;
  }, {});

  // code inline starts with '`' and ends with '`'.
  markdown.renderer.rules.code_inline = function (tokens, idx, options, env, slf) {
    var content = tokens[idx].content || '';

    // inline asciimath
    if (options.asciimath && options.tex) {
      // asciimath starts with '@' and ends with '@'.
      var code = content.split(/^@(.+)@$/)[1];
      if (code) {
        return (0, _katex.renderAsciimathInline)(code);
      }
    }

    // inline tex
    if (options.tex) {
      // TeX starts with '$' and ends with '$'.
      var _code = content.split(/^\$(.+)\$$/)[1];
      if (_code) {
        return (0, _katex.renderTexInline)(_code);
      }
    }

    // default
    return originRules.code_inline(tokens, idx, options, env, slf);
  };

  // fence block
  markdown.renderer.rules.fence = function (tokens, idx, options, env, slf) {
    var token = tokens[idx];
    var code = token.content.trim();
    var infos = token.info.trim().split(/\s+/g);
    var lang = infos[0];

    // TeX
    if (options.tex && (lang === 'tex' || lang === 'math')) {
      return (0, _katex.renderTexBlock)(code);
    }

    // programming language
    if ((0, _prism.hasLanguage)(lang)) {
      return (0, _prism.renderPrismBlock)(code, infos, options);
    }

    // unknown programming language
    return originRules.fence(tokens, idx, options, env, slf);
  };

  return markdown;
}

exports.default = getMarkdown;