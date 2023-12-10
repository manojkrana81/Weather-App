const Weather = require("../models/weather.model");

const getMinMaxTemp = (req, res)=>{
    const {locationName} = req.body;

    Weather.minMaxTemp(locationName, (err, result)=>{
        if(err){
            return res.status(500).json({
                status: 'Error',
                message: err.message,
                data: null,
            });
        }
        else{
            return res.status(200).json({
                status: 'Ok',
                message: '',
                data: result,
            });
        }
    });
}

module.exports = getMinMaxTemp;