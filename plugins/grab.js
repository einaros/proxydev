var request = require('request')
  , url = require('url')
  , path = require('path')
  , fs = require('fs')
  , serialiterate = require('../lib/serialiterate');

function ensurePathExists(root, targetPath, callback) {
  var pathSegments = targetPath.substr(root.length).split('/').filter(function(v) { return v.trim().length > 0; });
  serialiterate(0, pathSegments.length, function(i, next) {
    root = path.join(root, pathSegments[i]);
    fs.mkdir(root, function(error) {
      if (error && error.errno != 47) return next(error);
      next();
    });
  }).then(callback);
}

module.exports = {
  name: 'Script command: grab',

  getScriptApi: function() {
    return {
      grab: {
        usage: 'grab <url> [outputpath]',
        handler: function(logger, callback, fetchUrl, output) {
          if (!fetchUrl) {
            logger.warn('Usage: fetch <url> [filename]');
          }
          else {
            var parsedUrl = url.parse(fetchUrl);
            request(fetchUrl, function (error, response, body) {
              if (error) return callback(error);
              if (response.statusCode != 200) return callback(new Error('Server returned code: ' + response.statusCode));
              var targetPath = path.join(process.cwd(), parsedUrl.hostname, parsedUrl.pathname).trim();
              if (targetPath[targetPath.length - 1] == '/') targetPath += 'index.html';
              if (output) targetPath = path.join(path.dirname(targetPath), output);
              ensurePathExists(process.cwd(), path.dirname(targetPath), function(error) {
                if (error) return callback(error);
                fs.writeFile(targetPath, body, callback);
              });
            });
          }
        }
      }
    }
  }
};
