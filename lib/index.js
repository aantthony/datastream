var fs = require('fs');
var zlib = require('zlib');
var JSONStream = require('JSONStream');

module.exports = Client;

Client.Schema = require('./schema');

function Client(stream) {
  if (stream.readable) {
    var gunzip = zlib.createGunzip();
    stream.pipe(gunzip);
    var json = JSONStream.parse();
    gunzip.pipe(json);

    return json;
  } else if (stream.writable) {
    var gzip = zlib.createGzip();
    gzip.pipe(stream);
    var jsonify = JSONStream.stringify();
    jsonify.pipe(gzip);
    return jsonify;
  } else {
    throw new Error('Invalid');
  }

}