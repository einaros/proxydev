// Serial execution utility

module.exports = function serialiterate(start, count, perIterationCallback) {
  var next = function(error) {};
  var i = 0;
  var ctx = {};
  var self = this;
  function deferredIterate() {
    var args = arguments;
    process.nextTick(function() {
      iterate.apply(self, args);
    });
  }
  function iterate(error) {
    if (error) return next(error);
    if (i == count) return next();
    perIterationCallback.call(ctx, i, deferredIterate);
    i += 1;
  }
  process.nextTick(iterate);
  return {
    then: function(cb) { next = cb; }
  }
}
