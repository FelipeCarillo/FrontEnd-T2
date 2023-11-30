const port = 3000;
const cors = require('cors');
const express = require('express');
const API_KEY_OPENWEATHER = "ef0b0973b783e0614ac87612ec04344b";

const app = express();
app.use(cors());
app.use(express.json());

app.post('/city', (req, res) => {
    let city = req.body.city;
    async function getCoordinates(city) {
        let endpoint = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY_OPENWEATHER}`;
        const response = await fetch(endpoint);
        const data = await response.json();
        return data[0];
    }
    getCoordinates(city)
        .then(response => {
            let statusCode = 200;
            let lat = response.lat;
            let lon = response.lon;
            let city = response.name;
            res.send({ statusCode, lat, lon, city });
            }
        ).catch(error => {
            res.send({ statusCode: 404 });
        });
    }
);

app.get('/weather', (req, res) => {
    let lat = req.query.lat;
    let lon = req.query.lon;
    async function getWeather(lat, lon) {
        let endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY_OPENWEATHER}`;
        const response = await fetch(endpoint);
        const data = await response.json();
        return data;
    }
    getWeather(lat, lon).then(data => {
        let feels_like = data.main.feels_like;
        let description = data.weather[0].description;
        res.send({ feels_like, description });
    })
});

app.listen(port, () => {
    console.log("Server is running on port: " + port);
});

