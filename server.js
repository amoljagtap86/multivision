/**
 * Created by aj9682 on 5/12/2015.
 */
var express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport")
    LocalStrategy = require("passport-local").Strategy;

var env = process.env.NODE_ENV = process.env.NODE_ENV || "development";

var app = express();

var config = require("./server/config/config")[env];

require("./server/config/express")(app, config);

require("./server/config/mongoose")(config);

var User = mongoose.model("User");
passport.use(new LocalStrategy(function(username,password, done){
    console.log("username: " + username);
    User.findOne({userName:username}).exec(function(err, user){
        if(user){
            console.log("user: "+ user.userName);
            return done(null, user);
        }
        else{
            return done(null, false);
        }
    });

}));

passport.serializeUser(function(user, done){
    if(user){
        console.log("serialize user id: " + user._id);
        done(null,user._id);
    }
});

passport.deserializeUser(function(id, done){
    User.findOne({_id: id}).exec(function(err, user){
        if(user){
            console.log("deserialize user id: " + user._id);
            return done(null,user);
        }
        else{
            return done(null, false);
        }
    });
});

require("./server/config/route")(app);

app.listen(config.port);

console.log("Listening on port " + config.port + "...");