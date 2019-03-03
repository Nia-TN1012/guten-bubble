const path = require( 'path' ) ;
const UglifyJSPlugin = require( 'uglifyjs-webpack-plugin' );

module.exports = (env, argv) => ({
	entry: './index.js',
	devtool: 'false',
	output: {
		path: path.resolve( __dirname ),
		filename: argv.mode === 'production' ? 'js/guten-bubble.min.js' : 'js/guten-bubble.js',
	},
	module: {
		rules: [
			{
				test: /.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
		],
	},
	optimization: {
		minimizer:
			argv.mode === 'production' ?
				[
					new UglifyJSPlugin({
						uglifyOptions: { compress: { drop_console: true } },
					}),
				] :
				[],
	},
});
