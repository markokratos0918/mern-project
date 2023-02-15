const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
const User = require('./models/User')
const bcrypt = require('bcryptjs');
const app = express();
const jwt = require('jsonwebtoken');

const salt = bcrypt.genSaltSync(10);

app.use(cors());
app.use(express.json()); 

mongoose.connect('mongodb+srv://markde:0GZr06eFjtlOLMrn@cluster0.6f3vbcy.mongodb.net/?retryWrites=true&w=majority');

app.post('/register', async (req,res) => {
    const {username,password} = req.body;
    try{
    const userDoc = await User.create({
        username, 
        password:bcrypt.hashSync(password,salt),
    });
    res.json(userDoc);
    }catch(e) {
        res.status(400).json(e);
    }
});

app.post('/login', async (req,res) => {
    const {username,password} = req.body;
    const userDoc = await User.findOne({username});
    const passOK = bcrypt.compareSync(password, userDoc.password);
    res.json(passOK);
    if (passOK) {
        //logged in with json webtoken
    } else {
        res.status(400).json('wrong credentials');
    }

});

// default port for express
app.listen(4000);
//mongodb+srv://markde:0GZr06eFjtlOLMrn@cluster0.6f3vbcy.mongodb.net/?retryWrites=true&w=majority
//0GZr06eFjtlOLMrn