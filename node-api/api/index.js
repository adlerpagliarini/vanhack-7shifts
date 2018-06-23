var express = require('express');
var router = express.Router();

router.get('', function(req, res, next){
    console.log(1);
    res.render('index.html');
});

router.get('/api', function(req, res, next){
    console.log(2);
    res.render('index.html');
});

// to be accessible for other files
module.exports = router;