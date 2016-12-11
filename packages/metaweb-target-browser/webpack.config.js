var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
	entry: './src/js/index.js',
	output: {
		filename: 'bundle.js',
		path: './dist'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: { "loader": "babel-loader" }
			},

			{ test: /\.css$/, loader: ExtractTextPlugin.extract({
                	fallbackLoader: "style-loader",
            	    loader: "css-loader"
				})
			},
			{test: /\.html$/, use: 'html-loader'}
		]
	},
	plugins: [
		new CleanWebpackPlugin(['dist'], {}),
		new CopyWebpackPlugin([
			{context: 'src', from: "*.*", to : ""},
		 	{context: 'src', from: "css", to : "css"}
		 ]),
		new ExtractTextPlugin("styles.css"),
	]
}
