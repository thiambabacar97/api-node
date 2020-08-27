require('dotenv').config();
const express= require('express');
const app = express();
const router = require('./router/Routers');
const bodyparser = require('body-parser')

//midlleware
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//Routers
let apiVersion = '/api/v1';
app.use(apiVersion, router);

app.listen(process.env.APP_PORT, ()=>console.log(`serve running on ${process.env.APP_PORT}`)) ;