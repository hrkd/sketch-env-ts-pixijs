const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');

module.exports = merge(common, {
  mode: 'development',
  output: {
    path: `${__dirname}/build`,
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: `${__dirname}/public`,
  },
});
