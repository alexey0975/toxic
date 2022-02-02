// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const fs = require('fs');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const pugPagesPath = path.resolve(__dirname, 'src/pages');
const pugPages = fs.readdirSync(pugPagesPath).filter(file => {
  if (path.extname(file) === '.pug') return file;
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
        test: /\.(eot|ttf|woff|woff2|)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]'
        }
      },

      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          outputPath: '/img/',
        }

      },

      {
        test: /\.pug$/,
        loader: 'pug-loader',
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
