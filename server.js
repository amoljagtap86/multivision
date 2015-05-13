/**
 * Created by aj9682 on 5/12/2015.
 */
var express = require("express"),
    stylus = require("stylus"),
    logger = require("morgan"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

var env = process.env.NODE_ENV = process.env.NODE_ENV || "development";

var app = express();


function compile(str, path){
   return stylus(str).set("filename",path);
}

app.set("views",__dirname + "/server/views");
app.set("view engine","jade");
app.use(logger("dev"));
app.use(bodyParser());
app.use(stylus.middleware(
    {
    src: __dirname + "/public",
        compile: compile
    }
));

if(env==="development"){
    mongoose.connect("mongodb://localhost/multivision");
}
else {
    mongoose.connect("mongodb://ajagtap:multivision@ds037252.mongolab.com:37252/multivision");
}

var db = mongoose.connection;

db.on("error",console.error.bind(console,"connection error..."));

db.once("open",function(){
    console.log("DB connection opened");
});

var messageSchema = mongoose.Schema({message: String});

var Message = mongoose.model('Message', messageSchema);

var mongoMessage;

Message.findOne().exec(function(error, messageDoc){
    mongoMessage = messageDoc.message;
});

app.use(express.static(__dirname +"/public"));

app.get("/partials/:partialPath", function(req, res){
    res.render("partials/" + req.params.partialPath);
});

app.get("*",function(req,res){
    //res.render("index");
    res.render("index",{mongoMessage:mongoMessage});
});

var port = process.env.PORT || 3030;
app.listen(port);

console.log("Listening on port " + port + "...");