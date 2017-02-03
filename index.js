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

    var spawn = require('child_process').spawn;
    // console.log("Invoking local npmusic with flags:", flags);
    var cmd = spawn(__dirname + '/node_modules/.bin/npmusic', flags);

    cmd.on('error', function (err) {
        console.log("There was an error:", err);
    });

    cmd.on("data", function() {
      console.log("GOOD GOOD IT STARTED!")
    })

    var timeOut = setTimeout(function(){
        require('./dancing_bey')(function(){
            return true;
        }, function(){
            console.log('done');
        });
    }, CONFIG["fudge_factor"]);

    cmd.on('exit', function (code) {
      if (code !==0) {
        clearTimeout(timeOut);
        console.log("*********************");
        console.log("Error: Oh no, Bey had a bug! Try this:");
        console.log("$ youtube-dl -U")
        console.log("Depending on your system you might need to prepend sudo, eg $ sudo youtube-dl -U");
        console.log("*********************");
        return process.exit(1);
      } else {
        console.log("Bey out!");
        process.exit(0);
      }
    });

    return cmd;
}
