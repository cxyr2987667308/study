const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const webpack = require('webpack'); // 用于访问内置插件
const path = require('path');

module.exports = {
    entry: './../src/index.js',
    output: {
        path: path.resolve(__dirname, './../dist'),
        filename: 'static/js/[name].bundle.js',
        chunkFilename: 'static/js/[name].chunk.js'
    },
    module: {
        rules: [
            { test: /\.txt$/, use: 'raw-loader' }
        ]
    },
    // plugins: [
    //     new webpack.optimize.UglifyJsPlugin(),
    //     new HtmlWebpackPlugin({template: './public/index.html'})
    // ]
};