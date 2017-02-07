import markdownIt from 'markdown-it';
import 'github-markdown-css/github-markdown.css';

import _ from 'lodash';

import {
  renderAsciimathInline,
  renderTexInline,
  renderTexBlock,
} from './katex';

import {
  hasLanguage,
  renderPrismBlock,
} from './prism';

function getMarkdown(options) {
  const defaultOptions = {
    html:         true,         // Enable HTML tags in source
    xhtmlOut:     true,         // Use '/' to close single tags (<br />).
                                // This is only for full CommonMark compatibility.
    breaks:       false,        // Convert '\n' in paragraphs into <br>
    linkify:      false,        // Autoconvert URL-like text to links

    asciimath:    true,         // Convert AsciiMath to HTML.
                                // Invalid when TeX is false.
    tex:          true,         // Convert TeX to HTML using KaTeX.

    prism: {                    // Options for Prism, the highlight renderer.
      theme:      'default',  // Syntax theme
    }
  };

  // https://markdown-it.github.io/markdown-it/
  const markdown = markdownIt(options || defaultOptions);

  // node_modules/markdown-it/lib/renderer.js
  const originRules = _.reduce(markdown.renderer.rules, (accumulator, value, key) => {
    if (typeof value === 'function') {
      accumulator[key] = value.bind(markdown.renderer.rules);
    }
    return accumulator;
  }, {});

  // code inline starts with '`' and ends with '`'.
  markdown.renderer.rules.code_inline = function (tokens, idx, options, env, slf) {
    const content = tokens[idx].content || '';

    // inline asciimath
    if (options.asciimath && options.tex) {
      // asciimath starts with '@' and ends with '@'.
      let code = content.split(/^@(.+)@$/)[1];
      if (code) {
        return renderAsciimathInline(code);
      }
    }

    // inline tex
    if (options.tex) {
      // TeX starts with '$' and ends with '$'.
      let code = content.split(/^\$(.+)\$$/)[1];
      if (code) {
        return renderTexInline(code);
      }
    }

    // default
    return originRules.code_inline(tokens, idx, options, env, slf);
  };

  // fence block
  markdown.renderer.rules.fence = function (tokens, idx, options, env, slf) {
    const token = tokens[idx];
    const code = token.content.trim();
    const infos = token.info.trim().split(/\s+/g);
    const lang = infos[0];

    // TeX
    if (options.tex && (lang === 'tex' || lang === 'math')) {
      return renderTexBlock(code);
    }

    // programming language
    if (hasLanguage(lang)) {
      return renderPrismBlock(code, infos, options);
    }

    // unknown programming language
    return originRules.fence(tokens, idx, options, env, slf);
  };

  return markdown;
}

export default getMarkdown;