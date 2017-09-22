const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: ['babel-polyfill','./docs/src/index.js'],
  output: {
    path: '/',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  resolve: {
    modules: [path.resolve(__dirname, 'node_modules'), 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: [
            require.resolve("babel-preset-es2015"),
            require.resolve("babel-preset-stage-2"),
            require.resolve("babel-preset-react")
          ]
        },
        include: [path.join(__dirname, 'src'), /@folio/, path.join(__dirname, '../dev'), /[\/\\](stripes|ui)-(?!.*[\/\\]node_modules[\/\\])/, /\/@folio-sample-modules/]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader?modules&localIdentName=[local]---[hash:base64:5]'
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function (){
                return[
                  require('postcss-import'),
                  require('postcss-url'),
                  require("autoprefixer"),
                  require("postcss-custom-properties"),
                  require("postcss-calc"),
                  require("postcss-nesting"),
                  require("postcss-custom-media"),
                  require("postcss-media-minmax"),
                  require("postcss-color-function"),
                  
                ];
              }
            }
          }
        ]
      },
      {
        test:/.json$/,
        loader: 'json-loader'
      }
    ]
  },
};