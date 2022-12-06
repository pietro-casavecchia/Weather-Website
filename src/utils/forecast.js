const request = require('request')

require('dotenv').config();

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?${process.env.ACCESS_KEY}&query=${latitude},${longitude}`

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