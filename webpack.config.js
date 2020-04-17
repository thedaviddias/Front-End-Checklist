const webpack = require('webpack');
const path = require('path');

const mainPath = path.resolve(__dirname, 'src/scripts', 'main.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    cache: true,
    mode: 'production',
    entry: {
      app: mainPath
    },
    output: {
      filename: '[name].bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        }
      ]
    },
    optimization: {
      minimize: true
    }
};
