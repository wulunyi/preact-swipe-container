/**
 * @description 配置文件
 */

import webpack from 'webpack';
import path    from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

// 环境
const ENV = process.env.NODE_ENV || 'development';

// 目录变量
let SRC_PATH  = path.resolve('src');
let DIST_PATH = path.resolve('dist');
let LIB_PATH  = path.resolve('lib');

let enter = ENV === 'development' ? 'test/test.jsx' : 'src/preact-swipe-container.jsx';

module.exports = {
	entry: {
		index: path.resolve(enter)
	},

	output: {
		filename: 'preact-swipe-container.js',
		path    : ENV === 'development' ? DIST_PATH : LIB_PATH,
		library : 'SwipeContainer',
		libraryTarget :  'umd',
		umdNamedDefine: true
	},

	externals: {
		"preact": {
			commonjs: "preact",
			commonjs2: "preact",
			amd: "preact",
			root: "preact"
		}
	},

	resolve: {
		extensions: ['.js', '.json', '.scss', '.jsx'],
		modules   : ['node_modules', SRC_PATH],
	},

	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				include: SRC_PATH,
				exclude: path.resolve('node_modules'),
				use: [
					{loader: 'babel-loader'}
				]
			},
			{
				test: /\.scss$/,
				include: SRC_PATH,
				exclude: path.resolve('node_modules'),
				use: [
					{loader: 'style-loader'},
					{loader: 'css-loader'},
					{loader: 'postcss-loader'},
					{
						loader: 'px2rem-loader',
						options:{
							remUnit: 75,
							remPrecision: 8
						}
					},
					{loader: 'sass-loader'}
				]
			}
		]
	},

	devServer: {
		compress: true,
		port: 8888,
		host: 'localhost',
		publicPath: '/',
		contentBase: SRC_PATH,
		historyApiFallback: true,
		open: true,
	},

	plugins: [
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(ENV)
		}),
		new webpack.optimize.UglifyJsPlugin({
			output: {
				comments: false,
				beautify: false,
			},
			compress: {
				warnings: false,
				conditionals: true,
				unused: true,
				comparisons: true,
				sequences: true,
				dead_code: true,
				evaluate: true,
				if_return: true,
				join_vars: true,
				negate_iife: false,
				drop_console: true,
				collapse_vars: true,
				reduce_vars: true,
			}
		}),
	].concat(ENV === 'development' ? [
		new HtmlWebpackPlugin({
			template: path.resolve('test', 'index.html')
		}),
	]:[])
};