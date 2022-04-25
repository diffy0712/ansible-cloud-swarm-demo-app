const Webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  output: {
    chunkFilename: 'js/[name].chunk.js'
  },
  devServer: {
    hot: false,
    open: false,
    static: './src',
    port: 80,
    host: '0.0.0.0',
    allowedHosts: 'all'
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new ESLintPlugin({
      fix: true,
      emitError: true,
      emitWarning: true,
      failOnError: true,
      failOnWarning: true
    })
  ]
});
