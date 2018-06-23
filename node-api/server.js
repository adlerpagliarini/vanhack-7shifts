var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./api/index');
var users = require('./api/users');

var port = 3000;

var app = express();

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// View Engine
app.set('views', path.join(__dirname, 'views')); //views will be on views folder
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set Static Folder
app.use(express.static(path.join(__dirname, 'views'))); //angular will be here

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api', index);
app.use('/api', users);

app.listen(port, function(){
    console.log('Server started on port ' + port);
    //console.log(users);
});



