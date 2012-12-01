var path = require('path')
  , fs = require('fs')
  , url = require('url')
  , querystring = require('querystring')
  , SSEClient = require('sse').Client;

/**
 * Client side code
 */

var clientCode = '<script type="text/javascript">\n' +
                 '(function($) {\n' +
                 '  $("link[data-autoupdate]").each(function() {\n' +
                 '    var $el = $(this);\n' +
                 '    var path = $el.attr("src") || $el.attr("href");\n' +
                 '    var sse  = new EventSource("/autoupdater?path=" + path);\n' +
                 '    sse.addEventListener("changed", function (event) {\n' +
                 '      reloadStyle($el);\n' +
                 '    });\n' +
                 '  });\n' +
                 '})(jQuery);\n' +
                 'function reloadStyle($el) {\n' +
                 '  var src = $el.attr("href");\n' +
                 '  if (src.indexOf("x=") != -1) src = src.replace(/(x=[^&]*|$)/, "x=" + new Date().getTime());\n' +
                 '  else if (src.indexOf("?") != -1) src += "&x=" + new Date().getTime();\n' +
                 '  else src += "?x=" + new Date().getTime();\n' +
                 '  $el.attr("href", src);\n' +
                 '}\n' +
                 '</script>';

/**
 * Plugin setup
 */

module.exports = {
  name: 'AutoUpdater',

  attach: function(app) {
    app.all('/autoupdater', function(req, res, next) {
      if (!req.proxy) return next();
      var u = req.proxy.url;
      var query = querystring.parse(u.query);
      if (!query.path) return next();

      var client = new SSEClient(req, res);
      client.initialize();

      var pathUrl = url.parse(query.path);
      var filePath = path.normalize(path.join(process.cwd(), pathUrl.path));

      if (!fs.existsSync(filePath)) return next();
      var listener = function(curr, prev) {
        if (curr.mtime != prev.mtime) {
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
  postprocess: function(req, res, data) {
    if (!req.headers['referer']) {
      return data + '\n' + clientCode;
    }
  },
}
