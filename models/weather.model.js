const sql = require('./db');
const Weather = function (weather) {
    this.weather_id = weather.weather_id;
    this.location_id = weather.location_id;
    this.last_updated_epoch = weather.last_updated_epoch;
    this.last_updated = weather.last_updated;
    this.temperature_c = weather.temperature_c;
    this.temperature_f = weather.temperature_f;
    this.is_day = weather.is_day;
    this.condition_text = weather.condition_text;
    this.condition_icon = weather.condition_icon;
    this.condition_code = weather.condition_code;
    this.wind_mph = weather.wind_mph;
    this.wind_kph = weather.wind_kph;
    this.wind_degree = weather.wind_degree;
    this.wind_direction = weather.wind_direction;
    this.pressure_mb = weather.pressure_mb;
    this.pressure_in = weather.pressure_in;
    this.precipitation_mm = weather.precipitation_mm;
    this.precipitation_in = weather.precipitation_in;
    this.humidity = weather.humidity;
    this.cloud_cover = weather.cloud_cover;
    this.feelslike_c = weather.feelslike_c;
    this.feelslike_f = weather.feelslike_f;
    this.visibility_km = weather.visibility_km;
    this.visibility_miles = weather.visibility_miles;
    this.uv_index = weather.uv_index;
    this.wind_gust_mph = weather.wind_gust_mph;
    this.wind_gust_kph = weather.wind_gust_kph;
}

Weather.createWeather = (newWeather, result) => {
    sql.query('INSERT INTO weather SET ?', newWeather, (err, res) => {
        if (err) {
            console.log(err);
            return result(err, null);
        }
        return result(null, { id: res.insertId, ...newWeather });
    });
}

Weather.getWeatherData = (locationName, result) => {
    sql.query(`
        SELECT
            weather.*,
            locations.name
        FROM
            weather 
        JOIN
            locations ON weather.location_id = locations.location_id
        WHERE
            locations.name = ?
    `, [locationName],
    (err, res)=>{
        if(err){
            console.log(err);
            return result(err, null);
        }
        return result(null, res);
    }
    );
}

Weather.minMaxTemp = (locationName, result)=>{
    sql.query(`
    SELECT *
    FROM (
        SELECT *
        FROM weather
        JOIN locations ON weather.location_id = locations.location_id
        WHERE locations.name = ?
        ORDER BY temperature_c ASC
        LIMIT 1
    
        UNION
    
        SELECT *
        FROM weather
        JOIN locations ON weather.location_id = locations.location_id
        WHERE locations.name = ?
        ORDER BY temperature_c DESC
        LIMIT 1
    ) AS result
    LIMIT 2;
    
    `, [locationName], (err, res)=>{
        if(err){
            return result(err, null);
        }
        return result(null, res);
    });
}

Weather.getMinTemp = (locationName, result)=>{
    sql.query(
        `
            SELECT *
            FROM weather
            JOIN locations ON weather.location_id = locations.location_id
            WHERE locations.name = ?
            ORDER BY temperature_c ASC
            LIMIT 1;
        `,
        [locationName],
        (err, res)=>{
            if(err){
                console.log(err);
                return result(err, null);
            }
            return result(null, res);
        }
    )
}

Weather.getMaxTemp = (locationName, result)=>{
    sql.query(
        `
            SELECT *
            FROM weather
            JOIN locations ON weather.location_id = locations.location_id
            WHERE locations.name = ?
            ORDER BY temperature_c DESC
            LIMIT 1;
        `,
        [locationName],
        (err, res)=>{
            if(err){
                console.log(err);
                return result(err, null);
            }
            return result(null, res);
        }
    )
}
module.exports = Weather;