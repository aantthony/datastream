datastream
==========

Usage
```js
var encoder = new DataStream.Encoder();
var output = fs.createWriteStream('/file.jsons.gz');
encoder.pipe(zlib.createGzip()).pipe(output);

encoder.write({x:3});
encoder.write({x:4});
encoder.end();

encoder.on('finish', function () {
  console.log('Done!');
});
```

Reading:
```js
var decoder = new DataStream.Decoder();
var input = fs.createReadStream('/file.jsons.gz').pipe(zlib.createGunzip());
input.pipe(decoder);
decoder
.on('data', function (err, data) {
  console.log('value:', data.x);
})
.on('end', function () {
  console.log('---- finished.');
});
```

[![Build Status](https://travis-ci.org/aantthony/datastream.png?branch=master)](https://travis-ci.org/aantthony/datastream) [![Coverage Status](https://coveralls.io/repos/aantthony/datastream/badge.png?branch=master)](https://coveralls.io/r/aantthony/datastream?branch=master)