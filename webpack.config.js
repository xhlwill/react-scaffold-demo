var path = require('path');
var webpack = require('webpack');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'src');
var BUILD_PATH = path.resolve(ROOT_PATH, 'public');

// plugins
// var commonsChunkPlugin = new webpack.optimize.CommonsChunkPlugin({
//   name: 'vendor',
//   minChunks: Infinity
// });
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    // vendor: ['jquery'],
    index: path.resolve(APP_PATH, 'scripts/index.js'),
  },

  output: {
    path: BUILD_PATH,
    filename: '[name].bundle.js',
  },

  resolve: {
    extensions: ['', '.js', '.scss']
  },

  module: {
    // preLoaders: [
    //   {
    //     test: /\.js$/,
    //     loader: "eslint-loader",
    //     exclude: /node_modules/
    //   }
    // ],

    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css?minimize!postcss!sass'),
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|woff)$/,
        loader: 'url?limit=10240'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file"
      }
    ]
  },

  // eslint: {
  //   configFile: path.resolve(ROOT_PATH, '.eslintrc')
  // },

  postcss: [
    require('autoprefixer')
  ],

  plugins: [
    // uglifyJs,
    // new webpack.optimize.DedupePlugin(),
    // new webpack.optimize.OccurrenceOrderPlugin(true),
    // new webpack.HotModuleReplacementPlugin(),
    // commonsChunkPlugin,
    new ExtractTextPlugin('css/[name].css', {allChunks: true})
  ],

  // debug: "true",

  // enable source-map
  // devtool: "cheap-module-eval-source-map",

  // watch: true,
};
