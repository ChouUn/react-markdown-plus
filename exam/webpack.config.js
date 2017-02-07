const webpack = require('webpack');
const path = require('path');

const config = {
  // Entry point to the project
  entry: [
    'webpack/hot/dev-server',
    'babel-polyfill',
    './exam/index.js',
  ],

  // Configuration for dev server
  devServer: {
    contentBase: './exam/www',
    host: '127.0.0.1',
    port: 8000,
    hot: true,
    inline: true,
    filename: 'bundle.js', // Name of output file
  },

  plugins: [
    // Allows for sync with browser while developing (like BrowserSync)
    new webpack.HotModuleReplacementPlugin(),
    // Allows error warninggs but does not stop compiling. Will remove when eslint is added
    new webpack.NoErrorsPlugin(),
  ],

  module: {
    // Allow loading of non-es
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-0', 'react'],
          cacheDirectory: true,
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.(ttf|eot|svg|woff2?)(\?v=.+?)?$/,
        loader: 'url-loader?limit=1048576'
      },
      {
        test: /\.md$/,
        loader: 'raw-loader'
      },
    ],
  },
};

module.exports = config;