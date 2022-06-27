const bodyParser = require('body-parser');
const express = require('express');
const request = require('request');
const https = require('https');
const fs = require('fs');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// open APIKEY.txt and get the API key and lists key
const APIKEY = fs.readFileSync(__dirname + '/APIKEY.txt', 'utf8');
const APIKEY_ARRAY = APIKEY.split('\r\n');


app.get("/", (req, res) => {
    res.sendFile(__dirname + '/signup.html');
}
);

app.post("/", (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us9.api.mailchimp.com/3.0/lists/" + APIKEY_ARRAY[1];
    const options = {
        method: "POST",
        auth: "basic:" + APIKEY_ARRAY[0]
    };
    const request = https.request(url, options, (response) => {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + '/success.html');
        } else {
            res.sendFile(__dirname + '/faliure.html');
        }
    }
    );
    request.write(jsonData);
    request.end();



});

app.post("/faliure", (req, res) => {
    res.redirect("/");
}
);

app.listen(process.env.PORT || 3000, function () {
    console.log('Server is running on port 3000');
}
);