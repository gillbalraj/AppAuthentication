var mongoose                = require("mongoose"),
    passportLocalMongoose   = require("passport-local-mongoose")

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

//provide methods to Userschema
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);