var viz = require("viz.js");
var through2 = require("through2");
var spawnStream = require("spawn-stream");
var r = require('viz.js/full.render.js');
var Module = r.Module;
var render = r.render;


var graphviz = module.exports = function(format) {
    if (format == "png") {
        return function() {

            return spawnStream("dot", ["-T", format]);
            //return spawnStream(uiflow.DOT_PATH, ["-T", format]);
        };
    }
    if (format == "svg") {
        return function() {
            return through2(function(chunk, enc, callback) {
                var v2 = new viz({Module: Module, render: render});
                var that = this;
                v2.renderSVGElement(String(chunk)).then(function(element) {
                    that.push(element);
                    callback();
                }).catch(function(error) {
                    console.log(error);
                });
            });
        }
    }

};
