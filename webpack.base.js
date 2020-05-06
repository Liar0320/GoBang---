/* eslint-disable import/no-extraneous-dependencies */
/*
 * @Author: lich
 * @Date: 2019-10-24 17:56:09
 * @Last Modified by: lich
 * @Last Modified time: 2020-04-27 13:29:17
 * @TODO:采用cdn加速
 */
// https://www.typescriptlang.org/docs/handbook/react-&-webpack.html
// / <reference types="./nodejs.d.ts" />

const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');

debugger;

/** @type { import("webpack").Configuration } */
const webpackConfig = {
  mode: 'development',
  entry: path.join(__dirname, 'src', 'index'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    // publicPath: '/dist/',
    filename: 'aol.js',
    chunkFilename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', 'scss'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@styles': path.resolve(__dirname, 'src', 'assets', 'contents'),
    },
  },
  devtool: 'source-map',
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.tsx?$/, loader: 'ts-loader' },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: 'pre',
        test: /.jsx?$/,
        include: [path.resolve(__dirname, 'src')],
        // exclude: [path.resolve(__dirname, 'node_modules')],
        loader: 'source-map-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        // exclude: [path.resolve(__dirname, 'node_modules')],
        include: [path.resolve(__dirname, 'src')],
        use: [
          // Creates `style` nodes from JS strings
          {
            loader: 'style-loader',
            // https://github.com/webpack-contrib/style-loader/issues/459
            options: {
              esModule: true,
            },
          },
          // https://github.com/seek-oss/css-modules-typescript-loader/issues/33
          { loader: 'css-modules-typescript-loader' }, // to generate a .d.ts module next to the .scss file (also requires a declaration.d.ts with "declare modules '*.scss';" in it to tell TypeScript that "import styles from './styles.scss';" means to load the module "./styles.scss.d.td")
          // Translates CSS into CommonJS
          {
            loader: 'css-loader',
            options: {
              // https://github.com/webpack-contrib/css-loader/blob/master/src/utils.js#L406 采用export default {} 导出css 模块化
              // onlyLocals: true,
              // 开启 CSS Modules
              esModule: true,
              // https://github.com/webpack-contrib/css-loader#modules
              modules: {
                // https://github.com/css-modules/css-modules
                localIdentName: '[local]--[hash:base64:5]',
              },
            },
          },
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              // name(file) {
              //   if (env === 'development') {
              //     return '[path][name].[ext]';
              //   }
              //   return '[hash].[ext]';
              // },
            },
          },
        ],
        include: [path.resolve(__dirname, 'src')],
      },
    ],
  },
  // https://webpack.docschina.org/concepts/mode/#mode-production
  // optimization: {
  //   minimize: false,
  // },
  target: 'web',
  plugins: [new HtmlWebpackPlugin({ template: './public/index.html' })],
  externals: [
    {
      react: 'React',
      'react-dom': 'ReactDOM',
      'react-redux': 'ReactRedux',
      redux: 'Redux',
    },
  ],
};

module.exports = webpackConfig;
