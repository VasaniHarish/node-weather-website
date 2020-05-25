const path = require('path');
const express = require('express');
const hbs = require('hbs')
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3001

//Define path for Express config
const publicPathDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials')

//Setup handlers engine and view location
app.disable('etag');
app.set('views', viewsPath);
app.set('view engine', 'hbs');
app.set('partials', partialPath);
hbs.registerPartials(partialPath)



//Setup Static directory to serve

app.use(express.static(publicPathDirectory))
app.get('/', (req, res) => {
  res.render('index', {
    title: "Weather App",
    body: "Sky is blue",
    name: "Harish Vasani"
  })
})

app.get('/About', (req, res) => {
  res.render('about', {
    title: "All About us!!",
    body: "Harish Bhai ki Jay!!",
    name: "Harish Vasani"
  })
})

app.get('/Help', (req, res) => {
  res.render('help', {
    title: "How May I Help you?",
    body: "Madad hi Bhagwan hai!!",
    name: "Harish Vasani"
  })
})

//app.get('/weather(' + content.languageSelector + ')/:page', function (req, res)


app.get('/weather', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'Address is missing'
    })
  }
  geoCode(req.query.search, (error, { name, lattitude, longitude } = {}) => {
    if (error) {
      return res.send({error});
    }
    forecast(lattitude, longitude, (error, forecastdata) => {
      if (error) {
        return res.send({error});
      }
      res.send({
        forecast: forecastdata,
        Location: name,
       Address: req.query.search
      })
    })
  })
})
app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide search query'
    })
  }
  console.log(req.query.search);

  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('help_404', {
    title: 'No Help',
    errorMessage: 'Help Article not found',
    name: "Harish Vasani"
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Page not found',
    name: "Harish Vasani"
  })
})

app.listen(port, () => {
  console.log('Server is up and running on ' + port);

})