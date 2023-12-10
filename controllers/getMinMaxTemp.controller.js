const Weather = require("../models/weather.model");

const getMinMaxTemp = (req, res)=>{
    const {locationName} = req.body;

    Weather.getMinTemp(locationName, (err, result1)=>{
        if(err){
            return res.status(500).json({
                status: 'Error',
                message: err.message,
                data: null,
            });
        }
        else{
            Weather.getMaxTemp(locationName, (err, result2)=>{
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
                        data: [...result1, ...result2],
                    });
                }
            });     
        }
    });
}

module.exports = getMinMaxTemp;