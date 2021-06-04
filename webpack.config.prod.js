const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: `${__dirname}/build`,
    filename: 'bundle.min.js',
  },
});
