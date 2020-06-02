var path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),

  mode: 'development',
  target: 'node',
  node: {
    __dirname: true
  },

  devtool: 'source-map',

  output: {
    path: path.resolve(__dirname, './functions'),
    filename: 'index.js'
  },
 
  module: {
    rules: [
    {
      loader: 'babel-loader',
      test: /\.jsx?$/,
      exclude: /node_modules/,
      options: {
        plugins: [
          ['transform-react-jsx', {pragma: 'h'}]
        ]
      }
    }
    ]
  }
};
