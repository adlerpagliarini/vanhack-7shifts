var express = require('express');
var router = express.Router();

var mongojs = require('mongojs');
//var db = mongojs('mongodb://vue-user:vue-user123@ds117250.mlab.com:17250/vue-app', ['users']);
var db = mongojs('mongodb://usrhack:hack-user123@ds115931.mlab.com:15931/vanhack', ['teste']);

// Get All Users - http://localhost:3000/api/users/
router.get('/users', function(req, res, next){
    db.users.find(function(err, users){
        if(err) res.send(err);
        res.json(users);
    });
});

// Get Single - http://localhost:3000/api/users/5aea2734734d1d06be08829d
router.get('/user/:id', function(req, res, next){
    db.users.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, user){
        if(err) res.send(err);
        res.json(user);
    });
});

// Post
router.get('/validade-user/:id', function(req, res, next){
    db.users.find({ "id": parseInt(req.params.id) }, function(err, user){
        if(err) res.send(err);
        res.json(user);
    });
});

router.post('/user', function(req, res, next){
    var user = req.body;
    console.log(user);
    if(!user.id){
        res.status(400);
        res.json({
            "error" : "Bad Data" + user.first_name
        });
    }else{
        db.users.save(user, function(err, user){
            if(err) res.send(err);
            res.json(user);
        });
    }
});

// Delete Single user - http://localhost:3000/api/user/5aea2734734d1d06be08829d
router.delete('/user/:id', function(req, res, next){
    db.users.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, user){
        if(err) res.send(err);
        res.json(user);
    });
});

// Put
router.put('/user/:id', function(req, res, next){
    var user = req.body;
   
    if(Object.keys(user).length == 0){
        res.status(400);
        res.json({
            "error" : "Bad Data"
        });
    }else{
        db.users.update({_id: mongojs.ObjectId(req.params.id)},  user, {}, function(err, user){
            if(err) res.send(err);
            res.json(user);
        });
    }
});

// to be accessible for other files
module.exports = router;