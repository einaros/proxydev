/* Jison generated parser */
var cliScript = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"expressions":3,"line":4,"EOF":5,"command":6,"WHITESPACE":7,"arguments":8,"CHAR":9,"DQUOTE":10,"dquotedargument":11,"SQUOTE":12,"squotedargument":13,"argument":14,"argumentchar":15,"BACKSLASH":16,"dquotedargumentchar":17,"squotedargumentchar":18,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",7:"WHITESPACE",9:"CHAR",10:"DQUOTE",12:"SQUOTE",16:"BACKSLASH"},
productions_: [0,[3,2],[4,1],[4,3],[6,2],[6,1],[8,5],[8,5],[8,3],[8,3],[8,3],[8,1],[14,2],[14,1],[15,1],[15,2],[15,2],[11,2],[11,1],[17,1],[17,1],[17,1],[17,2],[17,2],[17,2],[13,2],[13,1],[18,1],[18,1],[18,1],[18,2],[18,2],[18,2]],
performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

var $0 = $$.length - 1;
switch (yystate) {
case 1:return $$[$0-1];
break;
case 2:this.$ = {cmd: $$[$0], args: []}
break;
case 3:this.$ = {cmd: $$[$0-2], args: $$[$0]}
break;
case 4:this.$ = $$[$0-1] + $$[$0]
break;
case 5:this.$ = $$[$0]
break;
case 6:this.$.push($$[$0-1]);
break;
case 7:this.$.push($$[$0-1]);
break;
case 8:this.$.push($$[$0]);
break;
case 9:this.$ = [$$[$0-1]]
break;
case 10:this.$ = [$$[$0-1]]
break;
case 11:this.$ = [$$[$0]]
break;
case 12:this.$ = $$[$0-1] + $$[$0]
break;
case 13:this.$ = $$[$0]
break;
case 15:this.$ = $$[$0]
break;
case 16:this.$ = $$[$0]
break;
case 17:this.$ = $$[$0-1] + $$[$0]
break;
case 18:this.$ = $$[$0]
break;
case 22:this.$ = $$[$0]
break;
case 23:this.$ = $$[$0]
break;
case 24:this.$ = $$[$0]
break;
case 25:this.$ = $$[$0-1] + $$[$0]
break;
case 26:this.$ = $$[$0]
break;
case 30:this.$ = $$[$0]
break;
case 31:this.$ = $$[$0]
break;
case 32:this.$ = $$[$0]
break;
}
},
table: [{3:1,4:2,6:3,9:[1,4]},{1:[3]},{5:[1,5]},{5:[2,2],7:[1,6],9:[1,7]},{5:[2,5],7:[2,5],9:[2,5]},{1:[2,1]},{8:8,9:[1,13],10:[1,9],12:[1,10],14:11,15:12,16:[1,14]},{5:[2,4],7:[2,4],9:[2,4]},{5:[2,3],7:[1,15]},{7:[1,20],9:[1,18],11:16,12:[1,19],16:[1,21],17:17},{7:[1,26],9:[1,24],10:[1,25],13:22,16:[1,27],18:23},{5:[2,11],7:[2,11],9:[1,13],15:28,16:[1,14]},{5:[2,13],7:[2,13],9:[2,13],16:[2,13]},{5:[2,14],7:[2,14],9:[2,14],16:[2,14]},{9:[1,29],16:[1,30]},{9:[1,13],10:[1,31],12:[1,32],14:33,15:12,16:[1,14]},{7:[1,20],9:[1,18],10:[1,34],12:[1,19],16:[1,21],17:35},{7:[2,18],9:[2,18],10:[2,18],12:[2,18],16:[2,18]},{7:[2,19],9:[2,19],10:[2,19],12:[2,19],16:[2,19]},{7:[2,20],9:[2,20],10:[2,20],12:[2,20],16:[2,20]},{7:[2,21],9:[2,21],10:[2,21],12:[2,21],16:[2,21]},{9:[1,37],10:[1,36],16:[1,38]},{7:[1,26],9:[1,24],10:[1,25],12:[1,39],16:[1,27],18:40},{7:[2,26],9:[2,26],10:[2,26],12:[2,26],16:[2,26]},{7:[2,27],9:[2,27],10:[2,27],12:[2,27],16:[2,27]},{7:[2,28],9:[2,28],10:[2,28],12:[2,28],16:[2,28]},{7:[2,29],9:[2,29],10:[2,29],12:[2,29],16:[2,29]},{9:[1,42],12:[1,41],16:[1,43]},{5:[2,12],7:[2,12],9:[2,12],16:[2,12]},{5:[2,15],7:[2,15],9:[2,15],16:[2,15]},{5:[2,16],7:[2,16],9:[2,16],16:[2,16]},{7:[1,20],9:[1,18],11:44,12:[1,19],16:[1,21],17:17},{7:[1,26],9:[1,24],10:[1,25],13:45,16:[1,27],18:23},{5:[2,8],7:[2,8],9:[1,13],15:28,16:[1,14]},{5:[2,9],7:[2,9]},{7:[2,17],9:[2,17],10:[2,17],12:[2,17],16:[2,17]},{7:[2,22],9:[2,22],10:[2,22],12:[2,22],16:[2,22]},{7:[2,23],9:[2,23],10:[2,23],12:[2,23],16:[2,23]},{7:[2,24],9:[2,24],10:[2,24],12:[2,24],16:[2,24]},{5:[2,10],7:[2,10]},{7:[2,25],9:[2,25],10:[2,25],12:[2,25],16:[2,25]},{7:[2,30],9:[2,30],10:[2,30],12:[2,30],16:[2,30]},{7:[2,31],9:[2,31],10:[2,31],12:[2,31],16:[2,31]},{7:[2,32],9:[2,32],10:[2,32],12:[2,32],16:[2,32]},{7:[1,20],9:[1,18],10:[1,46],12:[1,19],16:[1,21],17:35},{7:[1,26],9:[1,24],10:[1,25],12:[1,47],16:[1,27],18:40},{5:[2,6],7:[2,6]},{5:[2,7],7:[2,7]}],
defaultActions: {5:[2,1]},
parseError: function parseError(str, hash) {
    throw new Error(str);
},
parse: function parse(input) {
    var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = "", yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    this.yy.lexer = this.lexer;
    this.yy.parser = this;
    if (typeof this.lexer.yylloc == "undefined")
        this.lexer.yylloc = {};
    var yyloc = this.lexer.yylloc;
    lstack.push(yyloc);
    var ranges = this.lexer.options && this.lexer.options.ranges;
    if (typeof this.yy.parseError === "function")
        this.parseError = this.yy.parseError;
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    function lex() {
        var token;
        token = self.lexer.lex() || 1;
        if (typeof token !== "number") {
            token = self.symbols_[token] || token;
        }
        return token;
    }
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == "undefined") {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
        if (typeof action === "undefined" || !action.length || !action[0]) {
            var errStr = "";
            if (!recovering) {
                expected = [];
                for (p in table[state])
                    if (this.terminals_[p] && p > 2) {
                        expected.push("'" + this.terminals_[p] + "'");
                    }
                if (this.lexer.showPosition) {
                    errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
                } else {
                    errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1?"end of input":"'" + (this.terminals_[symbol] || symbol) + "'");
                }
                this.parseError(errStr, {text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected});
            }
        }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(this.lexer.yytext);
            lstack.push(this.lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
                if (recovering > 0)
                    recovering--;
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {first_line: lstack[lstack.length - (len || 1)].first_line, last_line: lstack[lstack.length - 1].last_line, first_column: lstack[lstack.length - (len || 1)].first_column, last_column: lstack[lstack.length - 1].last_column};
            if (ranges) {
                yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
            }
            r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
            if (typeof r !== "undefined") {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}
};
/* Jison generated lexer */
var lexer = (function(){
var lexer = ({EOF:1,
parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },
setInput:function (input) {
        this._input = input;
        this._more = this._less = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {first_line:1,first_column:0,last_line:1,last_column:0};
        if (this.options.ranges) this.yylloc.range = [0,0];
        this.offset = 0;
        return this;
    },
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) this.yylloc.range[1]++;

        this._input = this._input.slice(1);
        return ch;
    },
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length-len-1);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length-1);
        this.matched = this.matched.substr(0, this.matched.length-1);

        if (lines.length-1) this.yylineno -= lines.length-1;
        var r = this.yylloc.range;

        this.yylloc = {first_line: this.yylloc.first_line,
          last_line: this.yylineno+1,
          first_column: this.yylloc.first_column,
          last_column: lines ?
              (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length:
              this.yylloc.first_column - len
          };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        return this;
    },
more:function () {
        this._more = true;
        return this;
    },
less:function (n) {
        this.unput(this.match.slice(n));
    },
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20)+(next.length > 20 ? '...':'')).replace(/\n/g, "");
    },
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c+"^";
    },
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) this.done = true;

        var token,
            match,
            tempMatch,
            index,
            col,
            lines;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i=0;i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (!this.options.flex) break;
            }
        }
        if (match) {
            lines = match[0].match(/(?:\r\n?|\n).*/g);
            if (lines) this.yylineno += lines.length;
            this.yylloc = {first_line: this.yylloc.last_line,
                           last_line: this.yylineno+1,
                           first_column: this.yylloc.last_column,
                           last_column: lines ? lines[lines.length-1].length-lines[lines.length-1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length};
            this.yytext += match[0];
            this.match += match[0];
            this.matches = match;
            this.yyleng = this.yytext.length;
            if (this.options.ranges) {
                this.yylloc.range = [this.offset, this.offset += this.yyleng];
            }
            this._more = false;
            this._input = this._input.slice(match[0].length);
            this.matched += match[0];
            token = this.performAction.call(this, this.yy, this, rules[index],this.conditionStack[this.conditionStack.length-1]);
            if (this.done && this._input) this.done = false;
            if (token) return token;
            else return;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line '+(this.yylineno+1)+'. Unrecognized text.\n'+this.showPosition(),
                    {text: "", token: null, line: this.yylineno});
        }
    },
lex:function lex() {
        var r = this.next();
        if (typeof r !== 'undefined') {
            return r;
        } else {
            return this.lex();
        }
    },
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },
popState:function popState() {
        return this.conditionStack.pop();
    },
_currentRules:function _currentRules() {
        return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules;
    },
topState:function () {
        return this.conditionStack[this.conditionStack.length-2];
    },
pushState:function begin(condition) {
        this.begin(condition);
    }});
lexer.options = {};
lexer.performAction = function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {

var YYSTATE=YY_START
switch($avoiding_name_collisions) {
case 0:return 7;
break;
case 1:return 9;
break;
case 2:return 16;
break;
case 3:return 10;
break;
case 4:return 12;
break;
case 5:return 5;
break;
}
};
lexer.rules = [/^(?:\s+)/,/^(?:[^ '"\\])/,/^(?:\\)/,/^(?:")/,/^(?:')/,/^(?:$)/];
lexer.conditions = {"INITIAL":{"rules":[0,1,2,3,4,5],"inclusive":true}};
return lexer;})()
parser.lexer = lexer;
function Parser () { this.yy = {}; }Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();
if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = cliScript;
exports.Parser = cliScript.Parser;
exports.parse = function () { return cliScript.parse.apply(cliScript, arguments); }
exports.main = function commonjsMain(args) {
    if (!args[1])
        throw new Error('Usage: '+args[0]+' FILE');
    var source, cwd;
    if (typeof process !== 'undefined') {
        source = require('fs').readFileSync(require('path').resolve(args[1]), "utf8");
    } else {
        source = require("file").path(require("file").cwd()).join(args[1]).read({charset: "utf-8"});
    }
    return exports.parser.parse(source);
}
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(typeof process !== 'undefined' ? process.argv.slice(1) : require("system").args);
}
}