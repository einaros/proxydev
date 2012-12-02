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

var headers = {};

var api = {
  'set-grab-header': {
    usage: 'set-grab-header <headername> [value]',
    description: 'Sets (or unsets if no value is supplied) a header to be transmitted with the "grab" command.',
    handler: function(logger, callback, headername, value) {
      if (!headername) {
        logger.warn('Usage: ', api['set-grab-header'].usage);
        return callback();
      }

      if (!value) {
        logger.info('Unset header "%s" for "grab" api.', [headername]);
        delete headers[headername];
      }
      else {
        logger.info('Set header "%s" to "%s" for "grab" api.', [headername, value]);
        headers[headername] = value;
      }
    }
  },
  'get-grab-headers': {
    usage: 'get-grab-headers',
    description: 'Retrieves a header value to be transmitted with the "grab" command.',
    handler: function(logger, callback, headername, value) {
      logger.info('Headers: %s', [JSON.stringify(headers, null, 2)]);
    }
  },
  'grab': {
    usage: 'grab <url> [outputpath]',
    handler: function(logger, callback, fetchUrl, output) {
      if (!fetchUrl) {
        logger.warn('Usage: ', api.grab.usage);
        return callback();
      }

      logger.info('Downloading "%s".', [fetchUrl]);
      var parsedUrl = url.parse(fetchUrl);
      request({ headers: headers, url: fetchUrl }, function (error, response, body) {
        if (error) return callback(error);
        if (response.statusCode != 200) return callback(new Error('Server returned code: ' + response.statusCode));
        var targetPath = path.join(process.cwd(), parsedUrl.hostname, parsedUrl.pathname).trim();
        if (targetPath[targetPath.length - 1] == '/') targetPath += 'index.html';
        if (output) targetPath = path.join(path.dirname(targetPath), output);
        logger.info('Saving as "%s".', [targetPath]);
        ensurePathExists(process.cwd(), path.dirname(targetPath), function(error) {
          if (error) return callback(error);
          fs.writeFile(targetPath, body, callback);
        });
      });
    }
  }
};

module.exports = {
  name: 'Script command: grab',

  getScriptApi: function() {
    return api;
  }
};
