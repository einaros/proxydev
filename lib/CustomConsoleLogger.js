var util = require('util'),
    winston = require('winston');

var CustomConsoleLogger = winston.transports.CustomConsoleLogger = function (options) {
  this.name = 'customConsoleLogger';
  this.level = 'info';
  if (options && options.level) this.level = options.level;
};

util.inherits(CustomConsoleLogger, winston.Transport);
module.exports = CustomConsoleLogger;

CustomConsoleLogger.prototype.log = function (level, msg, meta, callback) {
  if (util.isArray(meta)) console.log(util.format.apply(this, [msg].concat(meta)));
  else if (meta) console.log(msg, JSON.stringify(meta));
  else console.log(msg);
  callback(null, true);
};
