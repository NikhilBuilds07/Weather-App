const express = require('express')
const fetch = require('node-fetch')
const cors = require('cors')
require('dotenv').config();

const app = express()
const PORT = 5000;

app.use(cors())
app.use(express.json())


app.get('/api/weather', async (req, res) => {
    const { city } = req.query;

    try {
        console.log(process.env.API_KEY);

        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}&q=${city}&days=7`);

        const data = await response.json();
        if (data.error) {
    return res.status(404).json({
        error: data.error.message
    });
}
        console.log(data);

        if (!response.ok) {
            return res.status(response.status).json(data);
        }

        res.json(data);


    } catch (e) {
        console.error("Weather API Error: ", e);
        res.status(500).json({ error: 'Error Fetching weather data' })
    }
})

app.listen(PORT, () => {
    console.log('Server Running on port', PORT)
});


