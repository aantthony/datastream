var fs = require('fs');
var DataStream = require('../..');

describe('DataStream', function () {
  describe('#pipe', function () {
    it('can be persisted to a file', function (done) {
      var c = new DataStream(fs.createWriteStream('/tmp/test12341234.jsons'));
      c.write({x:3});
      c.write({x:3});
      c.write({x:3});
      c.write({x:3});
      c.write({x:3});
      c.end();
      setTimeout(done, 300);
    });
    it('can read from a file', function (done) {
      var c = new DataStream(fs.createReadStream('/tmp/test12341234.jsons'));
      c.on('data', function (d) {
        console.log('json', d);
      });
      c.on('end', done);
    });
  });
});