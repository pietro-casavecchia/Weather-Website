const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=3ed2d925d7f74cf5c250f97c84f4ef28&query=' + latitude + ',' + longitude

    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connet to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to connet to weather service', undefined)
        } else {
            callback(undefined, 'It is currently ' + response.body.current.temperature + ' degress out. There is a ' + response.body.current.precip + '% chance of rain.')
        }
    })
}

module.exports = forecast 