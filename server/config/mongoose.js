var mongoose = require("mongoose");
module.exports = function(config){
    mongoose.connect(config.db);

    var db = mongoose.connection;

    db.on("error",console.error.bind(console,"connection error..."));

    db.once("open",function(){
        console.log("DB connection opened");
    });

    var userSchema = mongoose.Schema({
        firstName:  String,
        lastName: String,
        userName: String
    });

    var User = mongoose.model("User",userSchema);

    User.find({}).exec(function(err, collection){
        if(collection.length===0){
            User.create({firstName:"Amol", lastName:"Jagtap", userName:"amol"});
            User.create({firstName:"Another", lastName:"Jagtap", userName:"another"});
            User.create({firstName:"YetAnother", lastName:"Jagtap", userName:"amol"});
        }

    });
}