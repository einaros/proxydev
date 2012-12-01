var LocalContentServer = require('./lib/LocalContentServer')
  , url = require('url')
  , httpProxy = require('http-proxy')
  , path = require('path')
  , fs = require('fs')
  , program = require('commander')
  , spawn = require('child_process').spawn
  , readline = require('readline')
  , winston = require('winston')
  , ansi = require('ansi')
  , cursor = ansi(process.stdout);

/**
 * Internal API
 */

function list(val) {
  return val.split(',');
}

function setupSystemProxy() {
  spawn('networksetup', ['-setwebproxy', program.networkservice, 'localhost', program.listen, 'off']);
}

function teardownSystemProxy() {
  spawn('networksetup', ['-setwebproxystate', program.networkservice, 'off']);
}

/**
 * Initialization
 */

program
  .version('0.1')
  .option('-n, --networkservice <service>', 'Service to proxy [Wi-Fi]', 'Wi-Fi')
  .option('-l, --listen <port>', 'Port to use for proxy [5000]', 5000)
  .option('-p, --plugins <plugins>', 'Comma separated list of plugins to load', list)
  .option('-s, --stopped', 'Start without proxying enabled')
  .parse(process.argv);

if (!program.stopped) {
  setupSystemProxy();
}

var logger = new (winston.Logger)({
  transports: [
    new (require('./lib/CustomConsoleLogger'))(),
  ]
});

/**
 * Proxy
 */

var server = httpProxy.createServer(function (req, res, proxy) {
  // logger.info('Proxying request to "%s".', [req.url]);
  req.pause();
  var parsedUrl = url.parse(req.url);
  var domainFolder = path.normalize(path.join(process.cwd(), parsedUrl.hostname));
  fs.exists(domainFolder, function(exists) {
    if (exists) {
      // Domain folder exists, so allow the application to process the request
      req.proxyTools = {
        parsedUrl: parsedUrl,
        proxy: proxy,
        pathPrefix: domainFolder
      };
      localContentServer.process(req, res);
    }
    else {
      // Domain folder does not exist, proxy straight to site
      req.resume();
      proxy.proxyRequest(req, res, {
        host: parsedUrl.hostname,
        port: parsedUrl.port || 80
      });
    }
  });
});
server.listen(program.listen);

/**
 * Local server pipeline
 */

var localContentServer = new LocalContentServer();
var pluginDirectiveHandlers = [];

// Setup directive postprocessing handler on the content server
localContentServer.addPostProcessHandler(function(req, res, data) {
  // Process directives
  return data.replace(/\/\/@([^\()]*)\(([^)]*)\)/g, function(match, directive, args) {
    directive = directive.toUpperCase();
    for (var i = 0, l = directiveHandlers.length; i < l; ++i) {
      var handler = directiveHandlers[i];
      var res = handler(directive, arg, filePath, data);
      if (typeof res !== 'undefined') return res;
    }
    return '';
  });
});

// Process all plugins
if (program.plugins) {
  for (var i = 0, l = program.plugins.length; i < l; ++i) {
    var pluginPath = program.plugins[i];
    var plugin = require(path.join(process.cwd(), pluginPath));
    logger.info('Attaching plugin "%s".', [plugin.name || pluginPath])
    if (plugin.init) plugin.init(server);
    if (plugin.attach) plugin.attach(localContentServer.getApp());
    if (plugin.directive) pluginDirectiveHandlers.push(plugin.directive);
    if (plugin.postprocess) localContentServer.addPostProcessHandler(plugin.postprocess);
  }
}

// Instruct content server to initialize it's default pipeline
localContentServer.initializePipeline();

/**
 * Console interface
 */

function fixStdoutFor(cli) {
  var oldStdout = process.stdout;
  var newStdout = Object.create(oldStdout);
  newStdout.write = function() {
    cli.output.write('\x1b[2K\r');
    var result = oldStdout.write.apply(this, Array.prototype.slice.call(arguments));
    cli._refreshLine();
    return result;
  }
  process.__defineGetter__('stdout', function() { return newStdout; });
}

var cli = readline.createInterface(process.stdin, process.stdout);
fixStdoutFor(cli);
cli.setPrompt('> ');
cli.prompt();

cli.on('line', function(line) {
  line = line.trim();
  cli.prompt();
});

cli.on('close', function () {
  logger.info('Shutting down.');
  teardownSystemProxy();
  process.exit();
});

process.on('uncaughtException', function(err) {
  logger.error('Uncaught Exception, shutting down.');
  logger.error(err.message);
  logger.error(err.stack);
  teardownSystemProxy();
  process.exit(-1);
});
