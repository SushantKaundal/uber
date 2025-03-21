const dotenv = require('dotenv');
dotenv.config();


const cors = require('cors');
const express = require('express');
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/user',require('./routes/user.routes'));
app.use('/captian',require('./routes/captian.routes'));

module.exports = app;