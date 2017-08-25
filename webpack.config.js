var path = require('path'); 
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [
      path.resolve(__dirname, './src/js/app.js')
      ], 
    output: {
        path: path.resolve('dist/'), 
        publicPath: '/', 
        filename: "bundle.js"
    }, 
 
    module: {
        loaders: [
          {
            test: /\.js$/, 
            exclude: /node_modules/,
            loaders: ['babel-loader']
          },
          {
            test: /\.scss$/,
            exclude: /node_modules/,
            use: ExtractTextPlugin.extract({
              fallback: 'style-loader', 
              use: ['css-loader', 'sass-loader']
            })
          },
          {
            loader: 'url-loader?limit=10000', 
            test: /\.(jpg|png)$/, 
            exclude: /node_modules/
          }
        ]
    }, 
    plugins: [
      new ExtractTextPlugin('style.css')
    ]



}