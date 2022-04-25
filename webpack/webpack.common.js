// plugins
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');

const toSnake = (name, separator) => {
	return name.replace(/([a-z]|(?:[A-Z0-9]+))([A-Z0-9]|$)/g, function(_, $1, $2) {
		return $1 + ($2 && (separator || '-') + $2);
	}).toLowerCase();
};

// globals
const path = require('path'),
	glob = require("glob");

// path definitions
const srcFolder = path.resolve(__dirname, '../src/'),
	distFolder = path.resolve(__dirname, '../build/'),
	publicFolder = path.resolve(__dirname, '../public/');

const scriptEntries = glob.sync(`${srcFolder}/pages/*/index.ts`).reduce((all, entryPath) => {
	const entryName = entryPath.replace(`${srcFolder}/pages/`, '').replace('/index.ts', '');
	all[toSnake(entryName)] = entryPath;
	return all;
}, {});

// webpack config
module.exports = {
	mode: 'production',
	entry: {
		common: `${srcFolder}/common/js/index.ts`,
		...scriptEntries
	},
	output: {
		path: distFolder,
		filename: 'js/[name].js',
	},
	module: {
		rules: [
			{
				test: /\.html$/i,
				use: 'html-loader',
			},
		  {
			  test: /\.ts?$/,
				use: ['babel-loader', 'ts-loader'],
			  exclude: /node_modules/,
		  },
		  {
			test: /\.js$/,
			include: srcFolder,
			use: 'babel-loader',
		  },
		  {
			test: /\.(sa|sc|c)ss$/,
			use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
		  },
		  {
			test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
			type: 'asset/resource',
			generator: {
				filename: 'assets/[name].[hash].[ext]'
			}
		  },
		],
	  },
	plugins: [
		new CleanWebpackPlugin(),
		// new CopyWebpackPlugin({ patterns: [{ from: publicFolder, to: 'public' }] }),
		new MiniCssExtractPlugin({
			filename: 'css/[name].[chunkhash:8].css',
		}), 
		new WebpackAssetsManifest({
			entrypoints: true,
			entrypointsUseAssets: true,
			publicPath: 'manifest.json'
		}),
	],
	resolve: {
		alias: {
			'~': srcFolder
		},
	},
	optimization: {
		splitChunks: {
			chunks: 'all',
			minChunks: 10,
			filename: 'js/[name].bundle.js'
		},
	},
};

glob.sync(`${srcFolder}/pages/*/index.html`).forEach(entryPath => {
	const entryName = toSnake(entryPath.replace(`${srcFolder}/pages/`, '').replace('/index.html', ''));
	module.exports.plugins.push(new HtmlWebpackPlugin({
		template: entryPath,
		filename: `${entryName}.html`,
		chunks: [
			'common', // common scripts
			entryName, // page specific script
		]
	}));
});
