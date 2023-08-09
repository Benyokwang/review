const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname,'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    port: 8080,
    hot: true,
    static: {
      directory: path.join(__dirname,'dist')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },{
        test: /\.css$/,
        use: ['style-loader','css-loader']
      }
    ]
  }
}