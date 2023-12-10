const sql = require('./db');
const LocationModel = function(location){   
    this.name = location.name;
    this.region = location.region;
    this.country = location.country;
    this.latitude = location.latitude;
    this.longitude = location.longitude;
    this.timezone_id = location.timezone_id;
    this.localtime_epoch = location.localtime_epoch;
    this.localtime = location.localtime;
}

LocationModel.createLocation = (newLocation, result)=>{
    sql.query('INSERT INTO locations SET ?', newLocation, (err, res)=>{
        if(err){
            console.log(err);
            return result(err, null);
        }
        return result(null, {id: res.insertId, ...newLocation});
    });
}

LocationModel.findLocationByName = (locationName, result)=>{
    sql.query(`SELECT * FROM locations WHERE name = ?`, [locationName], (err, res)=>{
        if(err){
            console.log(err);
            return result(err, null);
        }
        return result(null, res[0]);
    });
}

module.exports = LocationModel;