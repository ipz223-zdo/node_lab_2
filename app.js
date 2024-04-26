const express = require("express");
const hbs = require("hbs");
const axios = require('axios');
const fs = require('fs');

hbs.registerPartials(`${__dirname}/views/partials`);
let app = express();

app.set('view engine', 'hbs');

const cities = JSON.parse(fs.readFileSync('cities.json', 'utf-8'));

app.get('/', (req, res) => {
    res.render('main.hbs');
});

app.get('/weather/:city', async (req, res) => {
    let city = req.params.city;

    if (!city) {
        return res.send('Please provide a city name');
    }

    try {
        const apiKey = '';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

        const response = await axios.get(apiUrl);
        const weatherData = response.data;
        res.render('weather.hbs', { city, cities, weather: weatherData  });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(3000, "127.0.0.1", () => {
    console.log("Example app listening on port 3000");
});



//nodemon -e js,hbs,json app