const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose"); //bridge to mongodb//
mongoose.set('strictQuery', true);
const User = require('./models/User')
const bcrypt = require('bcryptjs'); //encryp password//
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMidleware = multer({ dest: 'uploads/' }) //to save file in upload folder//
const fs = require('fs'); //renaming file//

const salt = bcrypt.genSaltSync(10);
const secret = 'asdfee123123434678090ouojljl';

// cors set credential to true and define origin
app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json()); 
app.use(cookieParser());

mongoose.connect('mongodb+srv://markde:0GZr06eFjtlOLMrn@cluster0.6f3vbcy.mongodb.net/?retryWrites=true&w=majority');//key connecting to db//

// registering user
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

// login for user
app.post('/login', async (req,res) => {
    const {username,password} = req.body;
    const userDoc = await User.findOne({username});
    const passOK = bcrypt.compareSync(password, userDoc.password);
    if (passOK) {
        // logged in
          jwt.sign({username,id:userDoc._id}, secret, {}, (err,token) => {
          if (err) throw err;
          res.cookie('token', token).json({
            id:userDoc._id,
            username,
          });
       });
     } else {
        res.status(400).json('wrong credentials');
    }
});

//change profile when logged in//
app.get('/profile', (req,res) => {
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err, info)=> {
        if (err) throw err;
        res.json(info);
    });        // res.json(req.cookies);
});

app.post('/logout', (req,res) => {
    res.cookie('token', '').json('ok');
});

//create post//
app.post('/post', uploadMidleware.single('file'), (req,res) => { 
    const {originalname,path} = req.file; //grab file//
    const parts = originalname.split('.'); //capture end of file name//
    const ext = parts[parts.length -1]; 
    const newPath = path+'.'+ext
    fs.renameSync(path, newPath); //rename file upload + extension//
    res.json({ext});
});

// default port for express
app.listen(4000);
//mongodb+srv://markde:0GZr06eFjtlOLMrn@cluster0.6f3vbcy.mongodb.net/?retryWrites=true&w=majority
//0GZr06eFjtlOLMrn