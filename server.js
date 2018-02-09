const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port =process.env.PORT || 3010;

var app=express();

hbs.registerPartials(__dirname + "/views/partials");
app.set('view engine','hbs');

app.use((req,res,next)=>{
    var now =new Date().toString();
    var lon = `${now}: ${req.method} ${req.url}`
    console.log(lon);
    fs.appendFile('server log', lon +"\n",(err)=>{
        if(err){
            console.log('unable to log into the file');
        }
    });
    next();
});


// app.use((req,res,next) =>{
//     res.render('maintainance.hbs');

// });

app.use(express.static(__dirname + "/public"));

hbs.registerHelper('getCurrentYear', () =>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});

app.get('/', (req,res) => {
    // res.send('<h1>Hello Express!</h1>');
    res.render('home.hbs',{
        pageTitle: 'Home page',
        welcomeMessage: 'Welcome to my website'
    });
});

app.get('/about', (req,res) => {
    res.render('about.hbs',{
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req,res) =>{
    res.send({
        Error: 'unable to fulfill the request'
    }); 
});
app.listen(port,()=>{
    console.log(`server is up on port no ${port}`);
});