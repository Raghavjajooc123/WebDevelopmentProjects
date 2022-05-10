const user = require('./models/user')
module.exports = function (app) {

    app.get('/', (req, res) => {
        res.status(200).render("home")
    })

    app.get('/login', (req, res) => {
        res.status(200).render("login")
    })

    app.get('/register', (req, res) => {
        res.status(200).render("register")
    })

    app.get('/dashboard', (req,res) =>{
        var warn=[];
        warn.push({
            msg: 'Please enter the credentials first'
        })
        res.render('login', {warn})
    })

    app.post('/register', (req, res) => {
        var username= req.body.user;
        var email= req.body.email;
        var password= req.body.pass;
        var repassword= req.body.repass;
        var regx = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/

        let error = [];
        let sucess = [];
        
        if (!username || !email || !password || !repassword) {
            error.push({
                msg: 'Please fill in all the fields.'
            })
        }
        if (!regx.test(email)){
            error.push({
                msg: "You have entered an invalid Email address."
            })
        }
        if (password !== repassword) {
            error.push({
                msg: 'Passwords must match.'
            })
        }
        if (password.length < 6) {
            error.push({
                msg: 'Password must be at least 6 characters long.'
            })
        }
        if (error.length > 0)
        {
            res.render("register", {error,username,email,password,repassword});
        }
        else{
            sucess.push({
                msg: 'You have been successfully registered.'
            })
            res.status(200).render("login",{sucess});
        }
    })

    app.post('/login', (req,res) =>{
        res.status(200).render("dashboard")
    })

}