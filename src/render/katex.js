import asciimath2latex from 'asciimath-to-latex';
import katex from 'katex';
import 'katex/dist/katex.css';

function renderAsciimathInline(code = '') {
  try {
    let texCode = asciimath2latex(code);
    return renderTexInline(texCode);
  } catch (err) {
    return `<code>${err}</code>`;
  }
}

function renderTexInline(code = '') {
  try {
    let htmlCode = katex.renderToString(code);
    return htmlCode;
  } catch (err) {
    return `<code>${err}</code>`;
  }
}

function renderTexBlock(code = '') {
  const lines = code.split(/(?:\n\s*){2,}/);

  // consecutive new lines means a new formula
  const tex = _.reduce(lines, function (result, line) {
    try {
      result += katex.renderToString(line, { displayMode: true });
    } catch (err) {
      result += `<pre>${err}</pre>`;
    }
    return result;
  }, '');

  return `<div>${tex}</div>`;
}

export {
  renderAsciimathInline,
  renderTexInline,
  renderTexBlock,
};