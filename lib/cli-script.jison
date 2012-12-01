/* description: Parses script grammar. */

/* lexical grammar */
%lex

%%
\s+                   return 'WHITESPACE';
[^ '"\\]              return 'CHAR';
"\\"                  return 'BACKSLASH';
"\""                  return 'DQUOTE';
"'"                   return 'SQUOTE';
<<EOF>>               return 'EOF';

/lex

%start expressions

%% /* language grammar */

expressions
    : line EOF
        {return $1;}
    ;

line
    : command
        {$$ = {cmd: $1, args: []}}
    | command WHITESPACE arguments
        {$$ = {cmd: $1, args: $3}}
    ;

command
    : command CHAR
        {$$ = $1 + $2}
    | CHAR
        {$$ = $1}
    ;

arguments
    : arguments WHITESPACE DQUOTE dquotedargument DQUOTE
        {$$.push($4);}
    | arguments WHITESPACE SQUOTE squotedargument SQUOTE
        {$$.push($4);}
    | arguments WHITESPACE argument
        {$$.push($3);}
    | DQUOTE dquotedargument DQUOTE
        {$$ = [$2]}
    | SQUOTE squotedargument SQUOTE
        {$$ = [$2]}
    | argument
        {$$ = [$1]}
    ;

argument
    : argument argumentchar
        {$$ = $1 + $2}
    | argumentchar
        {$$ = $1}
    ;

argumentchar
    : CHAR
    | BACKSLASH CHAR
        {$$ = $2}
    | BACKSLASH BACKSLASH
        {$$ = $2}
    ;

dquotedargument
    : dquotedargument dquotedargumentchar
        {$$ = $1 + $2}
    | dquotedargumentchar
        {$$ = $1}
    ;

dquotedargumentchar
    : CHAR
    | SQUOTE
    | WHITESPACE
    | BACKSLASH DQUOTE
        {$$ = $2}
    | BACKSLASH CHAR
        {$$ = $2}
    | BACKSLASH BACKSLASH
        {$$ = $2}
    ;

squotedargument
    : squotedargument squotedargumentchar
        {$$ = $1 + $2}
    | squotedargumentchar
        {$$ = $1}
    ;

squotedargumentchar
    : CHAR
    | DQUOTE
    | WHITESPACE
    | BACKSLASH SQUOTE
        {$$ = $2}
    | BACKSLASH CHAR
        {$$ = $2}
    | BACKSLASH BACKSLASH
        {$$ = $2}
    ;
