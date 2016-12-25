var express = require('express');
var fs=require('fs');
var router = express.Router();
router.get('/signup',function(req,res){
  res.render('signup',{error:req.session.zhuce});

});

router.post('/signup',function(req,res){
    getUser(function (data) {
        var user=data.find(function (item) {
            return item.username == req.body.username&&item.password == req.body.password;
        });
        if(user){
            req.session.zhuce='用户名已存在';
            res.redirect('/user/signup');
        }else {
            data.push(req.body);
            setUser(data,function () {
                res.redirect('/user/signin');
            })
        }

    })

});
router.get('/signin',function(req,res){
    res.render('signin',{error1: req.session.denglu});
});
router.post('/signin',function(req,res){
  var user = req.body;
   getUser(function (data) {
       var existUser = data.find(function(item){
           return user.username == item.username && user.password == item.password;
       });
       if(existUser){
           req.session.user=user.username;
           res.redirect('/user/welcome');
       }else{
           req.session.denglu='用户名或密码错误';
           res.redirect('/user/signin');
       }
   });

});
router.get('/welcome',function(req,res){
    res.render('welcome');
});
module.exports = router;

function getUser(fn) {
    fs.readFile('./app.json',function (err,data) {
        if(err){
            fn([]);
        }else {
            fn(JSON.parse(data));
        }
    })
}
function setUser(data,fn) {
    fs.writeFile('./app.json',JSON.stringify(data),fn);
}












