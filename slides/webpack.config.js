const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
  entry: {
    reveal: './index.js',
  },
  output: {
    path: path.resolve(__dirname, '../assets/static/slides/'),
    filename: '[name].js',
  },
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.pug$/,
        use: 'pug-loader',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|png|jpg|gif)$/,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'introducing-dry-python.pug',
      filename: 'introducing-dry-python.html',
    }),
    new HtmlWebpackPlugin({
      template: 'ddd-toolkit.pug',
      filename: 'ddd-toolkit.html',
    }),
    new HtmlWebpackPlugin({
      template: 'keeping-software-soft.pug',
      filename: 'keeping-software-soft.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
};
