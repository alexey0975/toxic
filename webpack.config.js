// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const fs = require('fs');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const pugPagesPath = path.resolve(__dirname, 'src/pages');
const pugPages = fs.readdirSync(pugPagesPath).filter(file => {
  if (path.extname(file) === '.pug') return file
});

const multipleHtmlPlugin = pugPages.map(page => {
  return new HtmlWebpackPlugin({
    template: `${pugPagesPath}/${page}`,
    filename: `${page.split('.')[0]}.html`,
  });
});

const isProduction = process.env.NODE_ENV == "production";

const config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
  },

  devServer: {
    open: true,
    host: "localhost",
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.pug',
      filename: 'index.html',
    }),

    new MiniCssExtractPlugin(),

    new CleanWebpackPlugin()
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ].concat(multipleHtmlPlugin),

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: 'babel-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'file-loader',
      },

      {
        test: /\.pug$/,
        loader: 'pug-loader'
      }

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
