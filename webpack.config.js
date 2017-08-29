var ExtractTextPlugin = require('extract-text-webpack-plugin')
var path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.css$|.scss$/,
        use: ExtractTextPlugin.extract({
           fallback: "style-loader",
           use:["css-loader",
                "sass-loader"
                ]
        })

      },
      {
        test: /\.js$|\.jsx$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['stage-0','es2015','react'],
            plugins: ["transform-class-properties"]

          }
        },
        exclude:/node_modules/
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 40000,

        }
      }


    ]
  },
  plugins: [
    new ExtractTextPlugin({
    filename: "bundle.css",
    disable: false,
    allChunks: true
  }),
   /*new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "window.jQuery": "jquery"
            })*/
    new UglifyJSPlugin({
    test: /\.js$/i,

})
  ]
}
