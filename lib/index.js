var fs = require('fs');
var zlib = require('zlib');
var util = require('util');
var Readable = require('stream').Readable;
var Transform = require('stream').Transform;

util.inherits(exports.Encoder = Encoder, Transform);
util.inherits(exports.Decoder = Decoder, Transform);

function Encoder() {
  Transform.call(this, {objectMode: true});
}

Encoder.prototype._transform = function (chunk, enc, next) {
  var buffer = new Buffer(JSON.stringify(chunk));
  var header = new Buffer(2);
  header.writeUInt16BE(buffer.length, 0);

  this.push(header);
  this.push(buffer);
  next();
};

function Decoder(inputFile) {
  Transform.call(this, {objectMode: true});
  this._bufs = [];
}

Decoder.prototype._transform = function (chunk, enc, next) {
  this._bufs.push(chunk);
  while (this._bufs.length) {
    if (this._bufs[0].length === 0) {
      this._bufs.shift();
      continue;
    }
    var size = this._bufs[0].readUInt16BE(0);
    var total = 0;
    for (var i = 0; i < this._bufs.length; i++) {
      total += this._bufs[i].length;
      if (total >= size) {
        var inc = this._bufs.slice(0, i + 1);
        var current = Buffer.concat(inc);
        var now = current.slice(2, 2 + size);
        this._bufs.splice(0, i + 1, current.slice(2 + size));
        this.push(JSON.parse(now));
      }
    }
    // break;
  }

  next();
  
};