const path = require('path');


// this is "normal" node (js) code

// rule blow "everytime you see a js file that is not part of node_modules, run in through babel"
// babel-loader is a webpack variant of babel-cli, the presets are given by the .babelrc file
// regarding devtools; look at documentation page at webpack.js.org - there are many different variants!
// regarding css; "use" instead of "loader" - because it isn't one single loader (array is needed)
module.exports = {
  entry: './src/app.js',
  //entry: './src/playground/hoc.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      loader: 'babel-loader',
      test: /\.js$/,
      exclude: /node_modules/
    },{
      test: /\.s?css$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    }]
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true
  }
};

