const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// say to express what view engine we are using 
// express expect all the templates to be in views
app.set('view engine', 'hbs')
// say to hbs where the views directiory is if the name is not standard views
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// a static web page do not change 
// setup static dir to serve
app.use(express.static(publicDir))

const name = 'Pietro Casavecchia'


// for serve the page with hbs 
app.get('', (req, res) => {
    // the first value is the name to render the second 
    // is an object with all the vlaue you want to access in the index
    res.render('index', {
        title: 'Weather App',
        name
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help',
        name
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    // distructure and put as standard value and empty object 
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error: error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error: error})
            }

            res.send({
                forecast: forecastData,
                location, 
                address: req.query.address
            })
        })
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name,
        errorMessage: 'Page not found'
    })
})


// optional argument method that we can pass is a function when the server is up and running
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})





