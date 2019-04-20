var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        app: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        title: "Travelling Sales Person",
        template: './index.html'
    }),
    new CopyWebpackPlugin([
        { from: 'styles', to: 'styles' },
        { from: 'images', to: 'images' },
    ])],
    devServer: {
        open: true,
        compress: true,
        historyApiFallback: true,
        port: 3000
    },
}