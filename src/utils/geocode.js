const request = require('request');

const geocode = (address, callback) => {
    const geocodeURL= 'http://api.positionstack.com/v1/forward?access_key=68889f203277f1fe32ba38dd41d91263&query='+ encodeURIComponent(address) +'&country_module=1';
    request({ url: geocodeURL, json: true }, (error, {body} = {}) => {
      if (error) {
        callback('Unable to connect to the location services!');
      } else if(body.data.length === 0){
        callback('Invalid Location', undefined);
      } else {
        callback(undefined,{
          
          latitude : body.data[0].latitude,
          longitude : body.data[0].longitude,
          cityName: body.data[0].locality,
          state: body.data[0].region,
          country: body.data[0].country,
        }); 
        // console.log(body);
      }
    });
};

module.exports = geocode;