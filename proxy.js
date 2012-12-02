var LocalContentServer = require('./lib/LocalContentServer')
  , Proxy = require('./lib/Proxy')
  , ScriptController = require('./lib/ScriptController')
  , path = require('path')
  , fs = require('fs')
  , program = require('commander')
  , spawn = require('child_process').spawn
  , readline = require('readline')
  , winston = require('winston')
  , request = require('request')
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

var version = JSON.parse(fs.readFileSync(__dirname + '/package.json', 'utf8')).version;
program
  .version(version)
  .option('-n, --networkservice <service>', 'Service to proxy [Wi-Fi]', 'Wi-Fi')
  .option('-l, --listen <port>', 'Port to use for proxy [5000]', 5000)
  .option('-p, --plugins <plugins>', 'Comma separated list of plugins to load', list)
  .option('-s, --stopped', 'Start without proxying enabled')
  .parse(process.argv);

program.plugins = program.plugins || [];
if (!program.stopped) setupSystemProxy();

var logger = new (winston.Logger)({
  transports: [
    new (require('./lib/CustomConsoleLogger'))(),
  ]
});

/**
 * Script Controller initialization
 */

scriptController = new ScriptController(logger);

scriptController.registerCommandHandler('.exit', {
  usage: '.exit',
  handler: function(logger, callback) {
    process.exit();
  }
});
scriptController.registerCommandHandler('.help', {
  usage: '.help',
  handler: function(logger, callback) {
    var secondColPos = 30;
    logger.info('Available commands:');
    logger.info('%s %s %s', ['COMMAND', new Array(secondColPos - 'Command'.length).join(' '), 'USAGE']);
    var scriptCommands = scriptController.getCommands();
    var names = Object.keys(scriptCommands);
    for (var i = 0, l = names.length; i < l; ++i) {
      var name = names[i];
      var desc = scriptCommands[name];
      logger.info('%s %s %s', [name, new Array(secondColPos - name.length).join(' '), desc.usage]);
    }
  }
});

/**
 * Local server pipeline
 */

var localContentServer = new LocalContentServer();

// Load standard plugins
program.plugins.unshift(require('./plugins/grab'));
program.plugins.unshift(require('./plugins/autoupdater'));

// Process all plugins
if (program.plugins) {
  for (var i = 0, l = program.plugins.length; i < l; ++i) {
    var pluginPath = program.plugins[i];
    var plugin = typeof pluginPath == 'object' ? pluginPath : require(path.join(process.cwd(), pluginPath));
    logger.info('Attaching plugin: %s.', [plugin.name || pluginPath])
    if (plugin.init) plugin.init(server);
    if (plugin.attach) plugin.attach(localContentServer.getApp());
    if (plugin.postProcess) localContentServer.addPostProcessHandler(plugin.postProcess);
    if (plugin.getScriptApi) {
      var api = plugin.getScriptApi();
      if (api) {
        var keys = Object.keys(api);
        for (var j = 0, k = keys.length; j < k; ++j) {
          var key = keys[j];
          if (!api.hasOwnProperty(key)) continue;
          scriptController.registerCommandHandler(key, api[key]);
        }
      }
    }
  }
}

// Instruct content server to initialize it's default pipeline
localContentServer.initializePipeline();

/**
 * Proxy
 */

var proxy = new Proxy(logger);
proxy.initialize(program.listen, function(req, res, parsedUrl, fallback) {
  var domainContentPath = path.normalize(path.join(process.cwd(), parsedUrl.hostname));
  fs.exists(domainContentPath, function(exists) {
    if (exists) {
      // Domain folder exists, so allow the application to process the request
      localContentServer.process(req, res, domainContentPath, fallback);
    }
    else fallback();
  });
});

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

var cli = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  completer: function(line) { return scriptController.tabComplete(line); }
});

cli.on('line', function(line) {
  line = line.trim();
  scriptController.executeScript(line, function(error) {
    if (error) logger.info(error.stack);
    cli.prompt();
  });
});

cli.on('close', function () {
  logger.info('Shutting down.');
  teardownSystemProxy();
  process.exit();
});

fixStdoutFor(cli);
cli.setPrompt('> ');
cli.prompt();

process.on('uncaughtException', function(err) {
  logger.info('Uncaught Exception, shutting down.');
  logger.info(err.message);
  logger.info(err.stack);
  teardownSystemProxy();
  process.exit(-1);
});
