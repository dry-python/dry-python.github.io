const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postCssImport = require('postcss-import');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const purgecss = require('@fullhuman/postcss-purgecss');


module.exports = {
  entry: {
    app: './dry-python/index.js',
  },
  output: {
    path: path.resolve(__dirname, '../assets/static/'),
    filename: '[name].js',
  },
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                postCssImport,
                tailwindcss,
                autoprefixer,
                purgecss({
                  content: [`${path.join(__dirname, '..', 'templates')}/**/*.html`],
                  defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
                  // NOTE: Remove this ignore rules when we will
                  // initialize source code highlight without
                  // javascript.
                  whitelist: ['lang-python'],
                  whitelistPatterns: [/hljs*/, /turbolinks*/],
                }),
              ],
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|png|jpg)$/,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
};
