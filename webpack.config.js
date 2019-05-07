const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  module: {
    rules: [
		{
			test: /\.js$/,
			use: {
				loader: 'babel-loader',
				options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
			}
		},
		{
			test:/\.css$/,
			use:[
				"style-loader",
				"css-loader"
			]
    },
    {
      test: /\.(ttf|eot|svg|woff|woff2)(\?.+)?$/,
      loader: 'file-loader?name=[hash:12].[ext]'
    }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html'
    }),
    new webpack.NormalModuleReplacementPlugin(/element-react[\/\\]src[\/\\]locale[\/\\]lang[\/\\]zh-CN/, 'element-react/src/locale/lang/en')
  ]
};