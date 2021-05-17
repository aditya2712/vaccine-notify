require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require('path')

const app = express();

const routes = require('./routes/index')

app.set('views', path.join(__dirname , '../client/views' ))

app.use(cookieParser())

app.use(express.static(path.join(__dirname, '../client/public')))

app.set('view-engine', 'ejs')


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


