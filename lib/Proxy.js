var url = require('url')
  , spawn = require('child_process').spawn
  , httpProxy = require('http-proxy');

/**
 * Proxy server.
 *
 * @api public
 */

function Proxy(port, logger) {
  this.port = port;
  this.logger = logger;
}

module.exports = Proxy;

/**
 * Starts the proxy server.
 *
 * @api public
 */

Proxy.prototype.initialize = function(requestHook) {
  var self = this;
  this.server = httpProxy.createServer(function (req, res, proxy) {
    var parsedUrl = url.parse(req.url);
    req.pause();
    requestHook(req, res, parsedUrl, function() {
      // Hook did not serve request, so deal with it here instead
      req.resume();
      proxy.proxyRequest(req, res, {
        host: parsedUrl.hostname,
        port: parsedUrl.port || 80
      });
    });
  });
  this.server.listen(this.port);
}

/**
 * Sets the system proxy to be the local proxy server.
 * Currently only OS X compatible.
 *
 * @api public
 */

Proxy.prototype.setupSystemProxy = function(service, callback) {
  var proc = spawn('networksetup', ['-setwebproxy', service, 'localhost', this.port, 'off']);
  proc.on('exit', function (code) {
    if (!callback) return;
    if (code) return callback(new Error('Failed with code: ' + code));
    callback();
  });
}

/**
 * Removes the system proxy.
 * Currently only OS X compatible.
 *
 * @api public
 */

Proxy.prototype.teardownSystemProxy = function(service, callback) {
  var proc = spawn('networksetup', ['-setwebproxystate', service, 'off']);
  proc.on('exit', function (code) {
    if (!callback) return;
    if (code) return callback(new Error('Failed with code: ' + code));
    callback();
  });
}
