const express = require('express');
const weatherDataByLocationName = require('../controllers/weatherDataByLocation.controller');
const getMinMaxTemp = require('../controllers/getMinMaxTemp.controller');
const router = express.Router();

router.get('/ping', (req, res)=>{
    res.send('pong');
});
router.post('/getWeatherData', weatherDataByLocationName);
router.post('/getMinMaxTemp', getMinMaxTemp);

module.exports = router;