require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();


const routes = require('./routes/index')

app.use(cookieParser())
app.use('/', routes)


const port = process.env.PORT || 3000;

app.listen(port, () =>{
    console.log("Server Started");
})


