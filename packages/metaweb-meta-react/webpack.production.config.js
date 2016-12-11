var webpack = require('webpack');
var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
  devtool: 'source-map',
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
		libraryTarget: 'umd'
  },
  plugins: [
	new CleanWebpackPlugin(['dist'], {}),
	new webpack.DefinePlugin({
			process: JSON.stringify({env: {NODE_ENV: 'production'}})
		})
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    }]
  }
};
