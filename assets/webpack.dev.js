const path = require('path');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: ['./src/js/app.js', './src/sass/app.sass'],
  mode: 'development',
  output: {
    filename: './../dist/app.min.[hash].js',
    path: path.resolve(__dirname)
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['babel-preset-env']
         }
        }
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './../dist/main.min.[hash].css'
    }),
    new BrowserSyncPlugin(
      {
        host: 'localhost',
        port: 3000,
        proxy: 'http://locahost:3000/', // Update this address if you are using a proxy
        files: ['./../**/*.php', './../**/*.twig'],
        injectChanges: true,
        notify: false,
      }
    ),
    new CleanWebpackPlugin({
      dry: false,
      cleanOnceBeforeBuildPatterns: ['./../dist/*'],
      dangerouslyAllowCleanPatternsOutsideProject: true,
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        cache: false,
        parallel: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }
};