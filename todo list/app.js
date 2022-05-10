var fs = require('fs')
var path = require('path')
var express = require('express')
var bodyparser = require('body-parser')
const port = 3000
var app=express();

app.use('/static',express.static('static'))

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'viewsejs'))

var urlencodedparser=bodyparser.urlencoded({extended:false});

var todolists = [
    "Wash the car and change battery",
    "Decorate the house"
]

app.get('/',function(req,res){
    res.render('todo', { todolists:todolists } );
});

app.post('/',urlencodedparser ,function(req,res){
    var entry = req.body.search;
    todolists.push(entry)
    res.redirect('/');
});

// this is for all other URLS
app.get('*',function(req,res){
    res.send('<h1>Invalid Request</h1>');
})

app.listen(port,function(){
    console.log(`The server is running on port ${port}`);
});
