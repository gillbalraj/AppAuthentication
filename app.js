
var express                  = require("express"),
    mongoose                 = require("mongoose"),
    passport                 = require("passport"),
    bodyParser               = require("body-parser"),
    User                     = require("./models/user"),
    LocalStrategy            = require("passport-local"),
    passportLocalMongoose    = require("passport-local-mongoose")
   

mongoose.connect('mongodb://localhost:27017/auth_demo_app', { useNewUrlParser: true });


var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
    secret: "Passport is best for authentication",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//==================
// ROUTES
app.get("/", function(req, res){
    res.render("home")
})

app.get("/secret", function(req, res){
    res.render("secret")
})
//AUTH ROUTES
//Show sign up form
app.get("/register",function(req, res){
    res.render("register")
});
// handeling user register
app.post("/register", function(req, res){
    // res.send("REGISTER POST REQUEST")
    req.body.username
    req.body.password
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('register');
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/secret");
        });
    });

})



// app.listen(process.env.PORT, process.env.IP, function(){
//     console.log('Listening to port 8080');
// });
app.listen(8080);
console.log("Listening to 8080....")