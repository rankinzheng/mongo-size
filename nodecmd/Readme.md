

m-lv:node lvjian$ ./nodecmd.js -v
0.0.1
m-lv:node lvjian$ 
m-lv:node lvjian$ ./nodecmd.js -m 'node cmd' -i 1 -f 2.0 -r 1..10 -l 1,2,3,4
--messsage:
node cmd
--integer:
1
--range:
[ 1, 10 ]
--list:
[ '1', '2', '3', '4' ]
m-lv:node lvjian$ 
m-lv:node lvjian$ ./nodecmd.js -h
   Examples:

       # input string, integer and float
       $ ./nodecmd.js -m "a string" -i 1 -f 1.01

       # input range 1 - 3
       $ ./nodecmd.js -r 1..3

       # input list: [1,2,3]
       $ ./nodecmd.js -l 1,2,3


  Usage: nodecmd.js [options] [value ...]

  Options:

    -v, --version           output the version number
    -m, --message <string>  a string argument
    -i, --integer <n>       input a integet argument.
    -f, --float <f>         input a float arg
    -l, --list <items>      a list
    -r, --range <a>..<b>    a range
    -h, --help              output usage information

m-lv:node lvjian$