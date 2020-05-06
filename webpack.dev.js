/* eslint-disable import/no-extraneous-dependencies */
// / <reference types="./nodejs.d.ts" />
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const merge = require('webpack-merge');
const common = require('./webpack.base');

const thirdScripts = [
  './node_modules/react/umd/react.development.js',
  './node_modules/react-dom/umd/react-dom.development.js',
  './node_modules/redux/dist/redux.min.js',
  './node_modules/react-redux/dist/react-redux.min.js',
];

/** @type { import("webpack").Configuration } */
const prodConfig = merge(common, {
  mode: 'development',
  entry: path.join(__dirname, 'src', 'index'),
  output: {
    path: path.resolve(__dirname, 'dist.dev'),
    filename: 'aol.js',
  },
  optimization: {
    minimize: false,
  },
  // devtool: false,
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      templateParameters: (compilation, assets, assetTags, options) => {
        assets.js.unshift(...thirdScripts);

        return {
          compilation,
          webpackConfig: compilation.options,
          htmlWebpackPlugin: {
            tags: assetTags,
            files: assets,
            options,
          },
        };
      },
    }),
  ],
  // externals: [
  //   // 引入包里的特定部分
  //   function(context, request, callback) {
  //     // 所有 ol 包里的内容
  //     if (/^ol\/?/.test(request)) {
  //       // console.log(request);
  //       // https://segmentfault.com/q/1010000021965610?_ea=33440450
  //       // https://blog.meathill.com/fe-tool-chain/webpack-4-notes.html
  //       /** 先关闭webgl */
  //       const exclude = ['ol/layer/WebGLPoints', 'ol/tilegrid/TileGrid'];

  //       if (request === exclude[1]) return callback();

  //       return callback(null, request.replace(/\//g, '.'));
  //     }
  //     callback();
  //   },
  // ],
});

module.exports = prodConfig;
