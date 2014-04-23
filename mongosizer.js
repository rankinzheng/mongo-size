#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require('commander');

program
    .version('0.0.1')
    .usage('[option]')
    .option('-f, --filepath [path]', 'the document schema file path.');
// .option('-m, --million <m>', 'the how million,default:1.')
// .option('-u, --unit [unit]', 'the size unit,[KB|MB|GB|TB|PB],default:MB.');

program.on('--help', function() {
    console.log('  Examples:')
    console.log('')
    console.log('    mongosizer -f /xxx/xxx/example.json')
    console.log('')
});

program.parse(process.argv);

//check 
// console.log('you need option for bellow:');
// if (!program.filepath) console.log('  --filepath');
// if (!program.million) console.log('  --million');

/**
 * Start Program
 */
var fs = require("fs");
var _ = require("underscore");
var prettyBytes = require("pretty-bytes");
var jsonpretty = require("jsonpretty");

if (program.filepath) {

    var bcount = 0;
    var rj = {};

    var filepath = program.filepath;

    //read the filepath
    fs.readFile(filepath, function(err, data) {
        if (err) {
            console.log("read file happend err ", err);
            return;
        }
        var j = JSON.parse(data.toString());
        _.each(j, function(doc, key) {

            var schema = doc.schema;
            var million = doc.row_million || 1;

            var trj = {};
            rj[key] = trj;
            var _size = each_field(schema, trj);
            trj["_size"] = prettyBytes(_size * million * 1000000);
            trj["_dsize"] = prettyBytes(_size);
            trj["_row_million"] = million;
        });

        //
        console.log(jsonpretty(rj));
    });

    function each_field(doc, re) {
        var _size = 0;
        _.each(doc, function(field, key) {
            // when key is type get count
            var type = field['type'];
            if (type) {

                var filedcount = field['count'];
                var bytelen = 0;

                // switch type to bytes size
                if (type == 'objectid') {
                    bytelen = 12;
                } else if (type == 'string') {
                    bytelen = 1;
                } else if (type == 'string_chinese') {
                    bytelen = 4;
                } else if (type == 'int') {
                    bytelen = 4;
                } else if (type == 'long') {
                    bytelen = 8;
                } else if (type == 'byte') {
                    bytelen = 1;
                } else if (type == 'short') {
                    bytelen = 2;
                }
                // size for this field
                var fieldsize = filedcount * bytelen;
                re[key] = fieldsize + "byte";
                _size += fieldsize;
            } else {
                re[key] = {};
                each_field(field, re[key]);
            }
        });

        return _size;
    }
}