var parseScript = require('./cli-script').parse;

/**
 * CLI Script controller
 */

function ScriptController(logger) {
  this.logger = logger;
  this.handlers = {};
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
      var descriptor = this.handlers[script.cmd];
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
  if (this.handlers[command]) return false;
  this.handlers[command] = descriptor;
  return true;
}
