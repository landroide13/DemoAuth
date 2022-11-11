const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const session = require('express-session');

const mongoose = require('mongoose');
mongoose.connect(`mongodb://localhost:27017/register1`)
        .then(() => {
            console.log("Connection Open")
        })
        .catch(err => console.log(err))

const User = require('./models/user');

app.use(express.urlencoded({extended: true}));
app.use(session({secret: 'secret'}));
app.set('view engine', 'ejs');
app.set('views', 'views');

const requiredLogin = (req, res, next) =>{
    if(!req.session.user_id){
        return res.redirect('/login');
     }
     next();
}

app.get('/', (req, res) =>{
    res.send('This is the Home Page');
})

//Create User
app.get('/register', (req, res) =>{
    res.render('register');
})

app.post('/register', async(req, res) =>{
    const { password, username } = req.body;
    const user = new User({ username,password });
    await user.save();
    req.session.user_id = user._id;
    res.redirect('/');
})

//Login
app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', async(req, res) => {
    const { username, password} = req.body;
    const foundUser = await User.findAndValidate(username, password);
    if(foundUser){
        req.session.user_id = foundUser._id;
        res.redirect('/secret');    
    }else{
        res.redirect('/login');
    }
    //res.send(req.body);
})

app.post('/logout', (req, res) => {
    //req.session.user_id = null;
    req.session.destroy();
    res.redirect('/login');
})

app.get('/secret',requiredLogin, (req, res) =>{
    res.render('secret');
})

app.get('/private',requiredLogin, (req, res) =>{
    res.send('Private');
})





app.listen(3000, (req, res) =>{
    console.log('App runnning at 3000')
})














