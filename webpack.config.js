var path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),

  mode: 'development',

  devtool: 'source-map',

  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'bundle.js'
  },

  module: {
    rules: [
    {
      loader: 'babel-loader',
      test: /\.jsx?$/,
      resolve: { extensions: [".js", ".jsx"] },
      exclude: /node_modules/,
      options: {
        plugins: [
          ['transform-react-jsx', {pragma: 'h'}]
        ]
      }
    },
    {
      test: /\.css$/i,
      use: ['style-loader', 'css-loader'],
    }
    ]
  }
};
