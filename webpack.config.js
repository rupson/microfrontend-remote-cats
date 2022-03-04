const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');
const deps = require('./package.json').dependencies;

module.exports = {
	entry: './src/index',
	ignoreWarnings: [(_) => true, (_, __) => true],
	mode: 'development',
	devServer: {
		port: 3001,
		open: true,
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
	},
	module: {
		rules: [
			{
				test: /bootstrap\.js$/,
				loader: 'bundle-loader',
				options: {
					lazy: true,
				},
			},
			{
				test: /\.(js|jsx|tsx|ts)$/,
				loader: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		new ModuleFederationPlugin({
			name: 'cats',
			filename: 'remoteEntry.js',
			exposes: {
				// expose each component
				'./CatsApp': './src/components/CatsApp',
			},
			shared: ['react', 'react-dom'],
		}),
		new HtmlWebpackPlugin({
			template: './public/index.html',
		}),
	],
};
