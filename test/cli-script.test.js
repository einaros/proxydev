var parser = require('../lib/cli-script')
  , assert = require('assert');

describe('cli-script parser', function() {
  it('parses command without arguments', function() {
    var res = parser.parse('grab');
    assert.equal('grab', res.cmd);
    assert.equal(0, res.args.length);
  });

  it('parses commands and arguments', function() {
    var res = parser.parse('grab this/is/argument/one this-is-another here.is.a.third');
    assert.equal('grab', res.cmd);
    assert.equal(3, res.args.length);
    assert.equal('this/is/argument/one', res.args[0]);
    assert.equal('this-is-another', res.args[1]);
    assert.equal('here.is.a.third', res.args[2]);
  });

  it('parses unquoted arguments with a backslash', function() {
    var res = parser.parse('grab a\\\\b');
    assert.equal('grab', res.cmd);
    assert.equal(1, res.args.length);
    assert.equal('a\\b', res.args[0]);
  });

  it('parses singlequoted arguments with a backslash', function() {
    var res = parser.parse('grab \'a\\\\b\'');
    assert.equal('grab', res.cmd);
    assert.equal(1, res.args.length);
    assert.equal('a\\b', res.args[0]);
  });

  it('parses doublequoted arguments with a backslash', function() {
    var res = parser.parse('grab "a\\\\b"');
    assert.equal('grab', res.cmd);
    assert.equal(1, res.args.length);
    assert.equal('a\\b', res.args[0]);
  });

  it('parses arguments with a single dobulequoted argument', function() {
    var res = parser.parse('grab "hello"');
    assert.equal('grab', res.cmd);
    assert.equal(1, res.args.length);
    assert.equal('hello', res.args[0]);
  });

  it('parses arguments with a single singlequoted argument', function() {
    var res = parser.parse('grab \'hello\'');
    assert.equal('grab', res.cmd);
    assert.equal(1, res.args.length);
    assert.equal('hello', res.args[0]);
  });

  it('parses arguments with doublequotes', function() {
    var res = parser.parse('grab first "have a \' why dont you" third');
    assert.equal('grab', res.cmd);
    assert.equal(3, res.args.length);
    assert.equal('first', res.args[0]);
    assert.equal('have a \' why dont you', res.args[1]);
    assert.equal('third', res.args[2]);
  });

  it('parses arguments with singlequotes', function() {
    var res = parser.parse('grab first \'have a " why dont you\' third');
    assert.equal('grab', res.cmd);
    assert.equal(3, res.args.length);
    assert.equal('first', res.args[0]);
    assert.equal('have a " why dont you', res.args[1]);
    assert.equal('third', res.args[2]);
  });

  it('parses arguments with doublequotes and escaped doublequotes', function() {
    var res = parser.parse('grab first "have a \\\" why dont you" third');
    assert.equal('grab', res.cmd);
    assert.equal(3, res.args.length);
    assert.equal('first', res.args[0]);
    assert.equal('have a " why dont you', res.args[1]);
    assert.equal('third', res.args[2]);
  });

  it('parses arguments with singlequotes and escaped singlequotes', function() {
    var res = parser.parse('grab first \'have a \\\' why dont you\' third');
    assert.equal('grab', res.cmd);
    assert.equal(3, res.args.length);
    assert.equal('first', res.args[0]);
    assert.equal('have a \' why dont you', res.args[1]);
    assert.equal('third', res.args[2]);
  });
});
