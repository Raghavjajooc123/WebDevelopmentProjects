const express=require("express");
const fs=require("fs");
const path=require("path");
const app=express();
const port=800;

app.use('/static',express.static('static'))
           
app.use(express.urlencoded())
app.set('view engine','pug');
app.set('views',path.join(__dirname, 'template'));

app.get("/",(req,res)=>{
    const params={
        'title':"hi man!",
        'content':"Register Here"
    }
    res.status(200).render('mywebpage.pug',params)
});
app.post('/', (req,res)=>{
    console.log(req.body);
    name=req.body.name
    gender=req.body.gender
    email=req.body.email
    address=req.body.address
    about=req.body.about  
    let outputtowrite =`the person named ${name}, ${gender} ahs email address ${email}. he/she lives in ${address}
     and some more details about him/her is ${about}`
    fs.writeFileSync('output.txt',outputtowrite)
    const params={
        'title':"Thanks man!",
        'content':"Sucessful"
    }
    res.status(200).render('mywebpage.pug',params)
})

app.listen(port, ()=>{
    console.log(`the webpage is being ran on port ${port}`)
});
