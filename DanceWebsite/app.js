const express=require('express');
const path=require('path');
const fs=require('fs');
const mongoose=require('mongoose');
const bodyparser=require('body-parser');
const port=80;
const app=express();

mongoose.connect('mongodb://localhost/dancecontact', {useNewUrlParser: true, useUnifiedTopology: true});
var contactSchema = new mongoose.Schema({
    name: String,
    phone: Number,
    email: String,
    address: String,
    concern: String
  });
  var contact = mongoose.model('contact', contactSchema);

app.use('/static',express.static('static'))
app.use(express.urlencoded())

app.set('view-engine','pug')
app.set('views',path.join(__dirname,'template'))

app.get('/',(req,res)=>{
    const params = { }
    res.status(200).render('home.pug',params );
})

app.get('/contact',(req,res)=>{
    const params = { }
    res.status(200).render('contact.pug',params );
})
app.post('/contact',(req,res)=>{
    var mydata=new contact(req.body)
    mydata.save().then(()=>{
        res.status(200).render('home.pug');
    }).catch(()=>{
        res.status(400).send("Failed");
    })
})

app.listen(port, ()=>{
    console.log(`the server is running at port ${port}`)
})
