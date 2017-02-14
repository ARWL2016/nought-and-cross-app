var path = require('path'); 

module.exports = {
    context: path.resolve('js'), 
    entry: ["./app"], 
    output: {
        path: path.resolve('public/'), 
        publicPath: '/public/assets', 
        filename: "bundle.js"
    }, 

    devServer: {
        contentBase: 'public'
    }, 

    module: {
        rules: [
            {
                test: /\.css$/, 
                exclude: /node_modules/,
                loader: "style-loader!css-loader"
            }, 
            {
                test: /\.scss$/, 
                exclude: /node_modules/,
                loader: "style-loader!css-loader!sass-loader"
            }, 
            {
                loader: 'url-loader?limit=10000', 
                test: /\.(jpg|png)$/, 
                exclude: /node_modules/
            }


        ]
    }, 

    resolve: {
        extensions: ['.js']
    }

}