const LocationModel = require('../models/location.model');
const WeatherModel = require('../models/weather.model');
const https = require('https');

const syncWeatherDataController = () => {

    https.get('https://api.weatherapi.com/v1/current.json?key=a14c90ebc8fc494da36144609230912&q=London', (res) => {
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            const { location, current:currentWeather } = JSON.parse(data);
            const locationObjData = new LocationModel({
                name: location.name,
                region: location.region,
                country: location.country,
                latitude: location.lat,
                longitude: location.lon,
                timezone_id: location.tz_id,
                localtime_epoch: location.localtime_epoch,
                localtime: location.localtime,
            });
            LocationModel.findLocationByName(location.name, (err, data) => {
                if (err) {
                    console.log('some error occured');
                } else {
                    const weatherData = {
                        // location_id: data.location_id,
                        last_updated_epoch: currentWeather.last_updated_epoch,
                        last_updated: currentWeather.last_updated,
                        temperature_c: currentWeather.temp_c,
                        temperature_f: currentWeather.temp_f,
                        is_day: currentWeather.is_day,
                        condition_text: currentWeather.condition.text,
                        condition_icon: currentWeather.condition.icon,
                        condition_code: currentWeather.condition.code,
                        wind_mph: currentWeather.wind_mph,
                        wind_kph: currentWeather.wind_kph,
                        wind_degree: currentWeather.wind_degree,
                        wind_direction: currentWeather.wind_dir,
                        pressure_mb: currentWeather.pressure_mb,
                        pressure_in: currentWeather.pressure_in,
                        precipitation_mm: currentWeather.precip_mm,
                        precipitation_in: currentWeather.precip_in,
                        humidity: currentWeather.humidity,
                        cloud_cover: currentWeather.cloud,
                        feelslike_c: currentWeather.feelslike_c,
                        feelslike_f: currentWeather.feelslike_f,
                        visibility_km: currentWeather.vis_km,
                        visibility_miles: currentWeather.vis_miles,
                        uv_index: currentWeather.uv,
                        wind_gust_mph: currentWeather.gust_mph,
                        wind_gust_kph: currentWeather.gust_kph
                    };


                    if (data) {
                        const weatherObj = new WeatherModel({
                            location_id: data.location_id,
                            ...weatherData
                        });
                        WeatherModel.createWeather(weatherObj, (err, data) => {
                            if (err) {
                                console.log("Can't update the data");
                            } else {
                                console.log('Data Updated');
                            }
                        });
                    } else {
                        LocationModel.createLocation(locationObjData, (err, data) => {
                            if (err) {
                                console.log("Can't update the data");
                            } else {
                                const weatherObj = new WeatherModel({
                                    location_id: data.location_id,
                                    ...weatherData
                                });
                                WeatherModel.createWeather(weatherObj, (err, data) => {
                                    if (err) {
                                        console.log("Can't update the data");
                                    } else {
                                        console.log('Data Updated');
                                    }
                                });
                            }
                        });
                    }

                }

            });

        });
    });

}

module.exports = syncWeatherDataController;