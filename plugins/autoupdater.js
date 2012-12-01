var path = require('path')
  , fs = require('fs')
  , url = require('url')
  , querystring = require('querystring')
  , SSEClient = require('sse').Client;

/**
 * Client side code
 */

var clientCode = '<script type="text/javascript">' +
                 'function reloadStyle(path, sheet) {' +
                 '  if (path.indexOf("_autoupdate=") != -1) path = path.replace(/(_autoupdate=[^&]*|$)/, "_autoupdate=" + new Date().getTime());' +
                 '  else if (path.indexOf("?") != -1) path += "&_autoupdate=" + new Date().getTime();' +
                 '  else path += "?_autoupdate=" + new Date().getTime();' +
                 '  sheet.href = path;' +
                 '};' +
                 'var sheets = Array.prototype.slice.call(document.getElementsByTagName("link"), 0).filter(function(x) { return x.rel == "stylesheet"; });' +
                 'sheets.forEach(function(sheet) {' +
                 '  var path = sheet.href;' +
                 '  var sse  = new EventSource("/autoupdater?path=" + path);' +
                 '  sse.addEventListener("changed", function(event) {' +
                 '    reloadStyle(path, sheet);' +
                 '  });' +
                 '});' +
                 '</script>';

/**
 * Plugin setup
 */

module.exports = {
  name: 'AutoUpdater',

  attach: function(app) {
    app.all('/autoupdater', function(req, res, next) {
      var parsedUrl = url.parse(req.url);
      var query = querystring.parse(parsedUrl.query);
      if (!query.path) {
        res.status(404);
        res.end();
        return;
      }

      var client = new SSEClient(req, res);
      client.initialize();

      var pathUrl = url.parse(query.path);
      var domainContentPath = path.normalize(path.join(process.cwd(), parsedUrl.hostname)); // todo: move out
      var filePath = path.normalize(path.join(domainContentPath, pathUrl.path));

      if (!fs.existsSync(filePath)) {
        res.status(404);
        res.end();
        return;
      }
      var listener = function(curr, prev) {
        if (curr.mtime != prev.mtime) {
          console.log('File changed: "%s", notifying clients.', query.path);
          client.send('changed', query.path);
        }
      }
      fs.watchFile(filePath, listener);
      client.on('close', function() {
        fs.unwatchFile(filePath, listener);
      });
    });
  },

  // todo: should be able to restrict to certain file type
  postProcess: function(req, res, data) {
    if (!req.headers['referer'] || req.headers['referer'] == req.url) {
      return data + '\n' + clientCode;
    }
  },
}
