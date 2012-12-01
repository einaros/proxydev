module.exports = {
  name: 'Standard script commands',

  getScriptApi: function() {
    return {
      '.exit': {
        usage: '.exit',
        handler: function(logger, callback) {
          process.exit();
        }
      }
    }
  }
};
