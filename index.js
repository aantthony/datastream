module.exports = require('./lib');

if (process.env.DS_COVERAGE){
  var dir = './lib-cov/';
  module.exports = require(dir);
}