//BASIC SERVER & PROJECT SETUP
var express = require("express"); // Require the Express Module
var app = express(); // Create an Express App
var bodyParser = require("body-parser"); // Require body-parser (to receive post data from clients)
app.use(bodyParser.urlencoded()); // Integrate body-parser with our App
var path = require("path"); // Require path
app.use(express.static(__dirname + "./static")); // Setting our Static Folder Directory
app.set('views', path.join(__dirname, './views')); // Setting our Views Folder Directory
app.set('view engine', 'ejs'); // Setting our View Engine set to EJS

app.listen(8000, function() { // listening function for the app, port: localhost:8000;
  console.log("listening on port 8000");
})

//MONGOOSE SETUP
var mongoose = require('mongoose'); // Require the Mongoose
mongoose.connect('mongodb://localhost/basic_mongoose'); // change basic_mongoose to new project database name in the future



//ROUTES AND ROOT REQUESTS
app.get('/', function(req, res) {
    User.find({},function(err,users){
    	if(err)
    		console.log("Error matching DB request")
    	else
    		res.render('index', {info: users});
    });
})

// Add User Request 
app.post('/users', function(req, res) {
    console.log("POST DATA", req.body);
    var user = new User({
    	name: req.body.name,
    	age: req.body.age
    });
    user.save(function(err){
    	if(err)
    		console.log("Error saving to DB")
    	else
    		res.redirect('/');
    });
})


var UserSchema = new mongoose.Schema({
	name: String,
	age: Number
})
mongoose.model('User', UserSchema);
var User = mongoose.model('User')