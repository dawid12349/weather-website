const request = require("request");

const forecast = (lat, lon, callback )=>{
    const url = 'http://api.weatherstack.com/current?access_key=7ca7aeabcedef017df0ee2668f12a266&query='+lat+','+lon+'';
    request({url, json: true}, (err, {body})=>{
        if(err){
            callback("unable to connect to location services!", undefined);
         } else if(body.error){
            callback("unable to load data!", undefined);
         }
         else{
            callback(undefined, "its " +  body.current.weather_descriptions[0] + " and it's " + body.current.temperature +" Celsius and it feels like: " +  body.current.feelslike
            + ' Wind speed: ' + body.current.wind_speed + ' humidtiy: ' + body.current.humidity )
         }
    });
}

module.exports = forecast;