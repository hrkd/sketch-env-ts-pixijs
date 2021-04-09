const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: 'Output Management',
      inject: false
    })
  ],
  output: {
    path: `${__dirname}/docs`,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader'
      },
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        exclude: /node_modules/,
        use: 'raw-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.frag']
  },
  devServer: {
    contentBase: `${__dirname}/public`
  }
};
