var url = require('url')
  , httpProxy = require('http-proxy');

/**
 * Proxy server.
 *
 * @api public
 */

function Proxy(logger) {
  this.logger = logger;
}

module.exports = Proxy;

/**
 * Starts the proxy server.
 *
 * @api public
 */

Proxy.prototype.initialize = function(port, requestHook) {
  var self = this;
  this.port = port;
  this.server = httpProxy.createServer(function (req, res, proxy) {
    // logger.info('Proxying request to "%s".', [req.url]);
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
