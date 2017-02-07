import Prism, { languages, themes } from 'prismjs-polyfill';
import 'prismjs-polyfill/styles/index.css';

import { escapeHtml } from 'markdown-it/lib/common/utils';

import _ from 'lodash';

function getMapping() {
  let result = _.reduce(languages, (dict, value) => {
    dict[value] = value;
    return dict;
  }, {});

  // none
  result['none'] = 'none';

  // alias
  result['gcc'] = 'c';
  result['cplusplus'] = 'cpp';

  // symbol
  result['g++'] = 'cpp';
  result['c++'] = 'cpp';
  result['c#'] = 'csharp';
  result['f#'] = 'fsharp';

  // subset
  result['react'] = 'jsx';

  // extension
  result['h'] = 'cpp';
  result['cc'] = 'cpp';
  result['hpp'] = 'cpp';
  result['js'] = 'javascript';
  result['py'] = 'python';
  result['rb'] = 'ruby';
  result['sh'] = 'bash';
  result['bat'] = 'batch';
  result['ps'] = 'powershell';

  return result;
}

function hasLanguage(origin_lang) {
  const lang = origin_lang.toLowerCase();
  const mapping = getMapping();
  return !!mapping[lang];
}

function resolveInfos(infos) {
  let result = _.reduce(infos, (dict, info) => {
    const res = info.match(/([^=]+)=(.+)/);
    const key = res[1], value = res[2];

    dict[key] = value;
    return dict;
  }, {});

  return result;
}

const dataList = {
  'start': 'line-numbers',
  'line': 'line-highlight',
  'src': 'file-highlight',
};

function resolveOthers(others, plugins, preData) {
  _.forEach(others, (value, key) => {
    const plugin = dataList[key];
    if (plugin) {
      plugins.push(plugin);
      preData.push(`data-${key}="${value}"`);
    }
    else {
      preData.push(`${key}="${value}"`);
    }
  });
}

const pluginList = {
  'line-numbers': {
    divClass: 'prism-line-numbers',
    preClass: 'line-numbers',
  },
  'line-highlight': {
    divClass: 'prism-line-highlight',
  },
  'show-invisibles': {
    divClass: 'prism-show-invisibles',
  },
};

function resolvePlugins(plugins, divClass, preClass) {
  _.forEach(_.uniq(plugins), (plugin) => {
    const pluginData = pluginList[plugin];
    if (!pluginData) return;
    if (pluginData.divClass) divClass.push(pluginData.divClass);
    if (pluginData.preClass) preClass.push(pluginData.preClass);
  });
}

function renderPrismBlock(code = '', infos = [], options) {
  const mapping = getMapping();
  const lang = mapping[infos[0]];
  const grammar = Prism.languages[lang];

  const dict = resolveInfos(_.tail(infos));
  let { theme, plugins, ...others } = dict;
  theme = theme || (options.prism && options.prism.theme) || 'default';
  plugins = (plugins || '').split(',');

  const divClass = [], preClass = [], preData = [];
  resolveOthers(others, plugins, preData);
  resolvePlugins(plugins, divClass, preClass);

  const html = grammar ? Prism.highlight(code, grammar) : escapeHtml(code);
  const codeWrapper = `<code class="language-${lang}">${html}</code>`;
  const preWrapper = `<pre class="${preClass.join(' ')}" ${preData.join(' ')}>${codeWrapper}</pre>`;
  const divWrapper = `<div class="prism-${theme} ${divClass.join(' ')}">${preWrapper}</div>`;

  return divWrapper;
}

export {
  hasLanguage,
  renderPrismBlock,
};