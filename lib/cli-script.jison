/* description: Parses script grammar. */

/* lexical grammar */
%lex

%%
\s+                   return 'WHITESPACE';
[^ '"\\]              return 'CHAR';
"\\"                  return 'BACKSLASH';
"\""                  return 'DOUBLEQUOTE';
"'"                   return 'SINGLEQUOTE';
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
    : arguments WHITESPACE DOUBLEQUOTE dquotedargument DOUBLEQUOTE
        {$$.push($4);}
    | arguments WHITESPACE SINGLEQUOTE squotedargument SINGLEQUOTE
        {$$.push($4);}
    | arguments WHITESPACE argument
        {$$.push($3);}
    | DOUBLEQUOTE dquotedargument DOUBLEQUOTE
        {$$ = [$2]}
    | SINGLEQUOTE squotedargument SINGLEQUOTE
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
    | SINGLEQUOTE
    | WHITESPACE
    | BACKSLASH DOUBLEQUOTE
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
    | DOUBLEQUOTE
    | WHITESPACE
    | BACKSLASH SINGLEQUOTE
        {$$ = $2}
    | BACKSLASH CHAR
        {$$ = $2}
    | BACKSLASH BACKSLASH
        {$$ = $2}
    ;
