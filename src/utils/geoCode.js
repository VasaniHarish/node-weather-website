const request = require ('request');
const geoCode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiaGFyaXNodmEiLCJhIjoiY2thY2w2dTRsMDJ6ZzMxbG0xbzQxOTl2bSJ9.lb3Hj12CFfDcnTEXqn2LPA&limit=1';
  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback('Unable to connect location services', undefined)
    }
    else if (body.features.length === 0) {
      callback('Unable to find location. Try another search', undefined)
    }
    else {
      callback(undefined, {
        lattitude: JSON.stringify(body.features[0].center[1]),
        longitude: JSON.stringify(body.features[0].center[0]),
        name: (body.features[0].place_name)
      })
    }
  })
}

module.exports = geoCode