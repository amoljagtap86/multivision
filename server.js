/**
 * Created by aj9682 on 5/12/2015.
 */
var express = require("express"),
    mongoose = require("mongoose");

var env = process.env.NODE_ENV = process.env.NODE_ENV || "development";

var app = express();

var config = require("./server/config/config")[env];

require("./server/config/express")(app, config);

require("./server/config/mongoose")(config);

require("./server/config/route")(app);

app.listen(config.port);

console.log("Listening on port " + config.port + "...");