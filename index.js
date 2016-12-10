#!/usr/bin/env node

"use strict";
var CONFIG = require("./config.js");

if (!CONFIG["platform_supported"]) {
  console.log("\n***Warning***");
  console.log("Your machine's operating system is not offically supported at this time");
  console.log("This is not dangerous, but may exhibit strange behavior");
}

var inst = _play();


function _play() {
    var flags = ["-p", CONFIG["main"]];

    setTimeout(function(){
        require('./dancing_bey')(function(){
            return true;
        }, function(){
            console.log('done');
        });
    }, CONFIG["fudge_factor"])
    var spawn = require('child_process').spawn;
    // console.log("Invoking local npmusic with flags:", flags);
    var cmd = spawn('./node_modules/.bin/npmusic', flags); //Need flag builder

    cmd.on('error', function (err) {
        console.log("There was an error:", err);
    });

    cmd.stdout.on('data', function (data) {
        console.log(data.toString());
    });

    cmd.on('exit', function (code) {
      console.log("\n\nDONE!", code);
      process.exit(0);
    });

    return cmd;
}
