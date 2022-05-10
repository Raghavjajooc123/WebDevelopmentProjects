const express=require('express')
const http=require('http')
const path=require('path')
// const mongoose=require('mongoose')
const port=80
const app=express();

// mongoose.connect('mongodb://localhost/passport',{useNewUrlParser:true,useUnifiedTopology:true})
//     .then(()=> console.log('MongoDb Connected...'))
//     .catch(err => console.log(err));

var controller=require("../passportauthentication/controller");
const passport = require('./models/user');

app.use(express.urlencoded({ extended:false }))

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'templates'))

app.use('/static',express.static('static'));

controller(app);

app.listen(port,()=>{
    console.log(`the application is running on port ${port}`)
})


// things left
// bcrypting the password
// flash sucess message on redirecting from register to login
// login verification
// data storing on mongoose
// checking for already registered email while registration
// working on dashboard


// <label for="username">Username:</label>
// <input type="text" placeholder="Enter your Username" name="user" value="<%= username %>">
// <label for="email">Email:</label>
// <input type="text" placeholder="Enter your Email" name="email" value="<%= email %>">
// <label for="password">Password:</label>
// <input type="password" placeholder="Enter your Password" name="pass" value="<%= password %>">
// <label for="password">Confirm Password:</label>
// <input type="password" placeholder="Re-Enter your Password" name="repass" value="<%= repassword %>">
