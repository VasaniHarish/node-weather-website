const request = require('request');
//const chalk = require('chalk');

const forecast = (longitude,latitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=23246faae1fa0a002c48e0d5b7f0792f&query=' + longitude+','+latitude  + '&units=f';
  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback(console.log('unable to connect'), undefined)
    }
    else if (body.error) {
      callback(console.log('Coordinate error'), undefined)
    }
    else {
      //callback(undefined,'The place is ' + (body.location.name) + '\n' +body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out.');
      callback(undefined, body.current.weather_descriptions[0] + ' It is currently ' + body.current.temperature + ' degress out. There is a ' + body.current.precip + '% chance of rain.')
    }
  })
}

module.exports = forecast 