const schedule = require('node-schedule');
const syncWeatherDataController = require('../controllers/scheduler.controller');

const scheduler = schedule.scheduleJob('*/5 * * * *', function () {
   syncWeatherDataController();
});

