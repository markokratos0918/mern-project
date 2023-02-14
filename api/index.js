const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
const app = express();

app.use(cors());
//json parser//
app.use(express.json()); 

mongoose.connect('mongodb+srv://markde:0GZr06eFjtlOLMrn@cluster0.6f3vbcy.mongodb.net/?retryWrites=true&w=majority');

app.post('/register', (req,res) =>{
    const {username,password} = req.body;
    res.json({requestData:{username,password}});
});


// default port for express
app.listen(4000);
//mongodb+srv://markde:0GZr06eFjtlOLMrn@cluster0.6f3vbcy.mongodb.net/?retryWrites=true&w=majority
//0GZr06eFjtlOLMrn