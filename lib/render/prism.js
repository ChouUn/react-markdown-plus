'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderPrismBlock = exports.hasLanguage = undefined;

var _prismjsPolyfill = require('prismjs-polyfill');

var _prismjsPolyfill2 = _interopRequireDefault(_prismjsPolyfill);

require('prismjs-polyfill/styles/index.css');

var _utils = require('markdown-it/lib/common/utils');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function getMapping() {
  var result = _lodash2.default.reduce(_prismjsPolyfill.languages, function (dict, value) {
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
  var lang = origin_lang.toLowerCase();
  var mapping = getMapping();
  return !!mapping[lang];
}

function resolveInfos(infos) {
  var result = _lodash2.default.reduce(infos, function (dict, info) {
    var res = info.match(/([^=]+)=(.+)/);
    var key = res[1],
        value = res[2];

    dict[key] = value;
    return dict;
  }, {});

  return result;
}

var dataList = {
  'start': 'line-numbers',
  'line': 'line-highlight',
  'src': 'file-highlight'
};

function resolveOthers(others, plugins, preData) {
  _lodash2.default.forEach(others, function (value, key) {
    var plugin = dataList[key];
    if (plugin) {
      plugins.push(plugin);
      preData.push('data-' + key + '="' + value + '"');
    } else {
      preData.push(key + '="' + value + '"');
    }
  });
}

var pluginList = {
  'line-numbers': {
    divClass: 'prism-line-numbers',
    preClass: 'line-numbers'
  },
  'line-highlight': {
    divClass: 'prism-line-highlight'
  },
  'show-invisibles': {
    divClass: 'prism-show-invisibles'
  }
};

function resolvePlugins(plugins, divClass, preClass) {
  _lodash2.default.forEach(_lodash2.default.uniq(plugins), function (plugin) {
    var pluginData = pluginList[plugin];
    if (!pluginData) return;
    if (pluginData.divClass) divClass.push(pluginData.divClass);
    if (pluginData.preClass) preClass.push(pluginData.preClass);
  });
}

function renderPrismBlock() {
  var code = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var infos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var options = arguments[2];

  var mapping = getMapping();
  var lang = mapping[infos[0]];
  var grammar = _prismjsPolyfill2.default.languages[lang];

  var dict = resolveInfos(_lodash2.default.tail(infos));

  var theme = dict.theme,
      plugins = dict.plugins,
      others = _objectWithoutProperties(dict, ['theme', 'plugins']);

  theme = theme || options.prism && options.prism.theme || 'default';
  plugins = (plugins || '').split(',');

  var divClass = [],
      preClass = [],
      preData = [];
  resolveOthers(others, plugins, preData);
  resolvePlugins(plugins, divClass, preClass);

  var html = grammar ? _prismjsPolyfill2.default.highlight(code, grammar) : (0, _utils.escapeHtml)(code);
  var codeWrapper = '<code class="language-' + lang + '">' + html + '</code>';
  var preWrapper = '<pre class="' + preClass.join(' ') + '" ' + preData.join(' ') + '>' + codeWrapper + '</pre>';
  var divWrapper = '<div class="prism-' + theme + ' ' + divClass.join(' ') + '">' + preWrapper + '</div>';

  return divWrapper;
}

exports.hasLanguage = hasLanguage;
exports.renderPrismBlock = renderPrismBlock;