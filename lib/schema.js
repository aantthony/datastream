
module.exports = Schema;

function Schema (o) {
  this.keys = Object.keys(o).map(function (key) {
    var n = o[key];

    var k;

    if (typeof n === 'number') {
      if (n === 64) {

      }
    } else if (n === String) {
      // unbounded string

    } else if (typeof n === 'string') {
      var length = Number(n);
    }

    return {
      key: key,
      type: k
    };
  });
  this.l = this.keys.length;
}

Schema.prototype.encode = function (data, stream) {
  for (var i = 0, l = this.l; i < l; i++) {
    var v = data[this[i]];
  }
};