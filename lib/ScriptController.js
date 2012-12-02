var parseScript = require('./cli-script').parse
  , util = require('util');

require('tinycolor');


/**
 * CLI Script controller
 */

function ScriptController(logger) {
  this.logger = logger;
  this.commandDescriptors = {};
}

module.exports = ScriptController;

/**
 * Execute a line of script.
 *
 * @api public
 */

ScriptController.prototype.executeScript = function(line, callback) {
  try {
    script = parseScript(line);
    // Execute script, then callback
    if (script.cmd) {
      var descriptor = this.commandDescriptors[script.cmd];
      if (!descriptor) {
        this.logger.warn('Unknown script command: %s.', [script.cmd]);
        return callback();
      }
      var args = [this.logger, callback].concat(script.args);
      descriptor.handler.apply(this, args);
    }
    else callback();
  }
  catch (e) {
    callback(e);
  }
}

/**
 * Register a handler for a script command.
 *
 * @param command unique name of a command
 * @return true if accepted, false otherwise
 * @api public
 */

ScriptController.prototype.registerCommandHandler = function(command, descriptor) {
  if (command.indexOf(' ') != -1) return false;
  if (this.commandDescriptors[command]) return false;
  this.commandDescriptors[command] = descriptor;
  return true;
}

/**
 * Tab completion helper
 *
 * @api public
 */

ScriptController.prototype.tabComplete = function(line) {
  var completions = Object.keys(this.commandDescriptors);
  var hits = completions.filter(function(c) { return c.indexOf(line) == 0 })
  return [hits.length ? hits : completions, line];
}

/**
 * Retrieve script commands.
 *
 * @return descriptors for all registered commands.
 * @api public
 */

ScriptController.prototype.getCommands = function() {
  return this.commandDescriptors;
}

/**
 * Render usage text.
 *
 * @api public
 */

ScriptController.prototype.renderHelp = function(maxWidth) {
  var output = '';
  var scriptCommands = this.getCommands();
  var names = Object.keys(scriptCommands);
  for (var i = 0, l = names.length; i < l; ++i) {
    var name = names[i];
    var descriptor = scriptCommands[name];
    output += util.format('%s\n', descriptor.usage.green);
    if (descriptor.description) {
      var lines = chop(descriptor.description, maxWidth);
      for (var j = 0, k = lines.length; j < k; ++j) {
        var line = lines[j];
        output += util.format(' %s\n', line);
      }
      output += '\n';
    }
  }
  return output.replace(/\n+$/, '\n');
}

/**
 * Internal
 */

// Chops a string in pieces no longer than 'width',
// trying not to break words.
function chop(str, width) {
  var pieces = [];
  var prev = 0;
  var skipBlank = true;
  for (var i = 0, l = str.length; i < l; ++i) {
    var c = str[i];
    if (skipBlank && c == ' ') {
      prev = i + 1;
      continue;
    }
    skipBlank = false;
    if (i - prev + 1 == width || c == '\n') {
      if (c != '\n' && !(i + 1 < l && str[i + 1] == ' ')) {
        for (var j = i; j > prev; --j) {
          if (str[j] == ' ') {
            i = j;
            break;
          }
        }
      }
      var piece = str.slice(prev, i + 1);
      pieces.push(piece.trim());
      prev = i + 1;
      skipBlank = true;
    }
  }
  if (prev < i) {
    var piece = str.slice(prev, i + 1);
    pieces.push(piece.trim());
  }
  return pieces;
}
