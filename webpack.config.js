const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.ts',
  plugins: [
    new Dotenv({
      path: './.env',
      safe: true,
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: 'Output Management',
      inject: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        exclude: /node_modules/,
        use: 'raw-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.frag'],
  },
};
