const request = require('request');

const weatherInfo = ({latitude, longitude}, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=220752293c2906a786b4c5caa66ad77c&query='+ latitude +','+ longitude;
  
    request({url, json: true}, (error, {body})=>{
      if(error){
        callback('Unable to connect to the internet');
      } if(body.error){
        callback('Unable to find the location! Try again');
      } else {
        callback(undefined, body.current.weather_descriptions[0] +
          ". It is currently " +
          body.current.temperature +
          " degrees out. There is a " +
          body.current.precip +
          "% chance of rain. The humidity is " + body.current.humidity+".")  
      }
    })
}

module.exports = weatherInfo;