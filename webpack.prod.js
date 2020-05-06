/* eslint-disable import/no-extraneous-dependencies */
// / <reference types="./nodejs.d.ts" />
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const merge = require('webpack-merge');
const common = require('./webpack.base');

const thirdScripts = [
  'https://cdnjs.cloudflare.com/ajax/libs/react/16.13.1/umd/react.production.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.13.1/umd/react-dom.production.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/redux/4.0.5/redux.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/react-redux/7.2.0/react-redux.min.js',
];

/** @type { import("webpack").Configuration } */
const prodConfig = merge(common, {
  mode: 'production',
  entry: path.join(__dirname, 'src', 'index'),
  output: {
    filename: 'aol.min.js',
  },
  devtool: false,
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
