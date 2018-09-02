const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
    entry: '../slides/index.js',
    output: {
        path: path.resolve(__dirname, '../assets/static/slides/'),
        filename: 'bundle.js'
    },
    resolve: {
        modules: [path.resolve(__dirname, 'node_modules')]
    },
    mode: 'production',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: 'file-loader'
            },
            {
                test: /\.pug$/,
                use: 'pug-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: '../slides/index.pug'
        })
    ]
}
