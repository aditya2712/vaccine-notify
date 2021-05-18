require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require('path')
const webpush = require('web-push')

const app = express();

const routes = require('./routes/index')

const publicKey = 'BBRGVCdMH_tml2OIEFHmREmf5DsxWRHO4BnJAafxZwfu6uBTWrlcdB1FmZqIjpaZwEM8Mf9uytilmpiWFM760QE';
const privateKey = process.env.vapidPrivateKey;
webpush.setVapidDetails('mailto: test@test.com', publicKey, privateKey);

app.set('views', path.join(__dirname , '../client/views' ))

app.use(cookieParser())

app.use(express.static(path.join(__dirname, '../client/public')))

app.use(express.json())

app.set('view-engine', 'ejs')

// app.post('/subscribe', (req, res) => {
//     console.log(req.body)
//     const subscription = req.body;
//     res.status(201).json({})
//     const payload = JSON.stringify({ title: "Test Notification" })
//     webpush.sendNotification(subscription, payload).catch(err => console.log(err))
// } )

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


