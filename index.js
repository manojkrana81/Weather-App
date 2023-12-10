const express = require('express');
const app = express();
const router = require('./routes/routes');
require('dotenv').config();

app.use(express.json());
require('./scheduler/weather_sync.scheduler');
app.use('/', router);

app.listen(process.env.PORT, ()=>{
    console.log('server started');
});