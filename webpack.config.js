const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
  entry: './src/js/main.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.hbs$/,
        exclude: /node_modules/,
        use: 'handlebars-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  devServer: {
    proxy: {
      '/': {
        target: 'http://webpack-php.local',
        changeOrigin: true
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.hbs',
      filename: 'index.php',
      hash: true
    }),
    new WriteFilePlugin({
      test: /\.php$/
    })
  ]
};
