var should = require('should');

var self = require('../..');
var Schema = self.Schema;

describe('Schema', function () {
  it('should allow descriptions of a stream of binary data', function () {
    var s = new Schema({
      amount: Number(32),
      price: Number(64)
    });
  });
  describe('#encode', function () {
    it('should encode 32 bit numbers', function () {
      var s = new Schema({
        amount: Number(32)
      });
    });
  });
});