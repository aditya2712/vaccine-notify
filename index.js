require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const app = express();

const routes = require('./routes/index')

app.use(cookieParser())
app.use('/', routes)

mongoose.connect(process.env.dbURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, ()=>{
    console.log("Database Connected")
})

const port = process.env.PORT || 3000;

app.listen(port, () =>{
    console.log("Server Started");
})


