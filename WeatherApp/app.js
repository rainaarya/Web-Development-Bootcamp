const express = require('express');
const https = require('https');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
}
);

app.post('/', (req, res) => {
    var city = req.body.cityName;
    
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=ab6e7446d88d5735c50a2df04a980d2b&units=metric";
    https.get(url, (response) => {
        response.on('data', (data) => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weather = weatherData.weather[0].description;
            res.write("<p>The weather is currently " + weather +"</p>");
            res.write("<h1>The temperature in "+city+ " is " + temp + " degrees Celcius</h1>");
            const icon = weatherData.weather[0].icon;
            const url = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<img src=" + url + ">");
            res.send();
        });
    }
    ).on('error', (error) => {
        console.log(error);
    }
    );
}
);



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
