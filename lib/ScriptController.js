var parseScript = require('./cli-script').parse;

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
