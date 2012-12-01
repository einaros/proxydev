var path = require('path')
  , fs = require('fs')
  , express = require('express')

function LocalContentServer() {
  this.postprocessHandlers = [];

  this.app = express();

  // Compile a regex to deal with directive processing
  var mutableFileExtensions = ['js', 'html', 'htm', 'aspx', 'asp', 'php'];
  this.mutableExtensionMatchExpression = null;
  if (mutableFileExtensions.length > 0) {
    this.mutableExtensionMatchExpression = '(';
    mutableFileExtensions.forEach(function(x, i) {
      this.mutableExtensionMatchExpression += (i > 0 ? '|' : '') + '\\.' + x;
    });
    this.mutableExtensionMatchExpression += ')$';
    this.mutableExtensionMatchExpression = new RegExp(this.mutableExtensionMatchExpression, 'i');
  }
}

module.exports = LocalContentServer;

/**
 * Add a post processing handler to the pipeline
 */

LocalContentServer.prototype.addPostProcessHandler = function(handler) {
  this.postprocessHandlers.push(handler);
}

/**
 * Retrieves the underlying Express application
 *
 * @api public
 */

LocalContentServer.prototype.getApp = function() {
  return this.app;
}

/**
 * Initialize application pipeline
 *
 * @api public
 */

LocalContentServer.prototype.initializePipeline = function() {
  var self = this;

  // Serve local file
  this.app.all('*', function(req, res, next) {
    if (!req._extra) {
      res.status(500);
      res.end();
      return;
    }

    var filePath = path.normalize(path.join(req._extra.domainContentPath, req.path));
    self.serveLocalFile(req, res, filePath, function(handled) {
      // If local content wasn't served, trigger fallback
      if (!handled) req._extra.fallback();
    });
  });
}

/**
 * Handles an incoming request
 *
 * @api public
 */

LocalContentServer.prototype.process = function(req, res, domainContentPath, fallback) {
  req._extra = {
    domainContentPath: domainContentPath,
    fallback: fallback
  };
  this.app(req, res);
}

/**
 * Attempts to serve local content.
 *
 * @api private
 */

LocalContentServer.prototype.serveLocalFile = function(req, res, filePath, cb) {
  var self = this;

  // Expand the file path for default files
  if (filePath[filePath.length - 1] == '/') {
    var defaultFile = [ 'index.html', 'index.htm' ].filter(function(fileName) {
      return fs.existsSync(filePath + fileName);
    })[0];
    if (!defaultFile) return cb(false);
    filePath = filePath + defaultFile;
  }

  // Try sending file
  fs.exists(filePath, function(exists) {
    if (!exists) return cb(false);
    fs.readFile(filePath, function(error, data) {
      req.resume();

      if (error) {
        res.status(500);
        res.end();
        return cb(true);
      }

      // For certain files
      if (filePath.match(self.mutableExtensionMatchExpression)) {
        data = data.toString('utf8');
        res.charset = 'utf-8';

        // Allow plugins postprocessing
        for (var i = 0, l = self.postprocessHandlers.length; i < l; ++i) {
          var postprocessHandler = self.postprocessHandlers[i];
          var processingResult = postprocessHandler(req, res, data);
          if (processingResult != null && typeof processingResult != 'undefined') {
            data = processingResult;
          }
        }
      }

      // Send data
      res.type(path.extname(filePath));
      res.send(data);
      return cb(true);
    });
  });
}
