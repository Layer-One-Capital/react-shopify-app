var path = require('path')
var webpack = require('webpack');
var bourbon = require('node-bourbon').includePaths
var neat = require('node-neat').includePaths
var htmlWebpackPlugin = require('html-webpack-plugin')

var prerelease = JSON.parse(process.env.BUILD_PRERELEASE || 'false');
var release = JSON.parse(process.env.BUILD_RELEASE || 'false');

var definePlugin = new webpack.DefinePlugin({
  __DEV_API_PORT__: JSON.stringify(JSON.parse(process.env.API_PORT || '3000')),
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
  __PRERELEASE__: JSON.stringify(prerelease),
  __RELEASE__: JSON.stringify(release),
  __PUBLIC_HOST__: JSON.stringify(process.env.PUBLIC_HOST || 'http://www.blimpon.local' + ':' + process.env.API_PORT),
});

var basePlugins = [
  definePlugin,
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  new webpack.ProvidePlugin({
    'React': 'react'
  }),
  new webpack.ProvidePlugin({
    'ReactDOM': 'react-dom'
  }),
  new webpack.DefinePlugin({
    config: JSON.stringify(require("./package.json").common)
  }),
  new htmlWebpackPlugin({
    template: 'index.template.ejs',
    inject: 'body'
  })
];

var releasePlugins = [
  new webpack.DefinePlugin({
    "process.env": {
       NODE_ENV: JSON.stringify("production")
     }
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false },
    sourceMap: false,
    mangle: {
      except: ['$super', '$', 'exports', 'require']
    }
  })
];

var plugins = (prerelease || release) ? basePlugins.concat(releasePlugins) : basePlugins;

var entry = (prerelease || release) ? ['./app'] : ['react-dev-utils/webpackHotDevClient', './app'];

module.exports = {
  entry: entry,
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true
  },
  output: {
    path: __dirname,
    filename: '/assets/js/[hash].bundle.js',
  },
  resolve: {
    root: path.resolve(__dirname, './app'),
    fallback: [path.join(__dirname, 'node_modules')]
  },
  resolveLoader: {
    fallback: [path.join(__dirname, 'node_modules')]
  },
  sassLoader: {
    includePaths: [].concat(bourbon, neat)
  },
  plugins: plugins,
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel'
    }, {
      test: [/\.css$/, /\.scss$/],
      loaders: ["style", "css", "sass"]
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "url-loader?limit=10000&mimetype=application/font-woff"
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "file-loader"
    },
      { test: /\.png/,    loader: "url-loader?limit=10000&minetype=image/png" }
    ]
  },
  postcss: () => [require('autoprefixer'), require('precss')]
}
