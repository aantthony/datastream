var fs = require('fs');
var should = require('should');
var zlip = require('zlib');
var DataStream = require('../..');

describe('DataStream', function () {
  ([false, true]).forEach(function (w) {
    describe((w ? 'with' : 'without') + ' gzip', function () {
      var filename = '/tmp/test12341234.pjson.gz';

      it('can be persisted to a file', function (done) {
        var c = new DataStream.Encoder();

        if (w) {
          c
          .pipe(zlip.createGzip())
          .pipe(fs.createWriteStream(filename))
          .on('finish', done);
        } else {
          c
          .pipe(fs.createWriteStream(filename))
          .on('finish', done);
        }

        c.write({x:3});
        c.write({x:3});
        c.write({x:3});
        c.write({x:3});
        var longStr = '';
        for(var i = 0; i < 4096; i++) {
          longStr += '1';
        }
        c.write({x:3, str: longStr});

        c.end();
      });

      if (w) {
        it('should produce a small file', function (done) {
          fs.stat(filename, function (err, info) {
            (info.size < 1000).should.be.true;
            done(err);
          });
        });
      } else {
        it('should produce a large file', function (done) {
          fs.stat(filename, function (err, info) {
            (info.size > 4096).should.be.true;
            done(err);
          });
        });
      }

      it('can read from a file', function (done) {
        var c = new DataStream.Decoder();
        if (w) {
          fs.createReadStream(filename).pipe(zlip.createGunzip()).pipe(c);
        } else {
          fs.createReadStream(filename).pipe(c);
        }
        c.read();
        var hit = false;
        c
        .on('data', function (d) {
          d.should.have.property('x');
          hit = true;
        })
        .on('end', function (err) {
          hit.should.be.true;
          done(err);
        });
      });
    });
  });
  
});