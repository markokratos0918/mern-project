const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
const User = require('./models/User')
const bcrypt = require('bcryptjs');
const app = express();

app.use(cors());
app.use(express.json()); 

mongoose.connect('mongodb+srv://markde:0GZr06eFjtlOLMrn@cluster0.6f3vbcy.mongodb.net/?retryWrites=true&w=majority');

app.post('/register', async (req,res) => {
    const {username,password} = req.body;
    try{
    const userDoc = await User.create({username, password});
    res.json(userDoc);
    }catch(e) {
        res.status(400).json(e);
    }
});


// default port for express
app.listen(4000);
//mongodb+srv://markde:0GZr06eFjtlOLMrn@cluster0.6f3vbcy.mongodb.net/?retryWrites=true&w=majority
//0GZr06eFjtlOLMrn