var path = require("path");
var webpack = require("webpack");
//const TypescriptDeclarationPlugin = require('typescript-declaration-webpack-plugin');

module.exports = {
    entry: {
        'index': './src/state.ts'
    },
    mode: "production",
    output: {
        path: __dirname,
        filename: '[name].js',
        libraryTarget: 'amd',
        umdNamedDefine: true
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/
        }]
    }
};
