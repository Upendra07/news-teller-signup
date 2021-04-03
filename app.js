const express = require('express');
const app = express();
const request = require('request')
const https = require("https");

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.post("/", function(req, res) {
    const fname = req.body.fn;
    const lname = req.body.ln;
    const email = req.body.email;

    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: fname,
                LNAME: lname
            }
        }]
    }

    const jsonData = JSON.stringify(data);

    const url = "https://us1.api.mailchimp.com/3.0/lists/1fa3acabfe";

    const options = {
        method: "POST",
        auth: "uppi:c556a1ebb233461d254c1d7a67b67f44-us1"
    }

    const request = https.request(url, options, function(response) {

        if (response.responsecode === 200) {
            res.sendFile(__dirname + "/success.html")
        } else {
            res.sendFile(__dirname + "failure.html")
        }

        response.on("data", function(data) {
            console.log(JSON.parse(data));
        })
    });

    request.write(jsonData);
    request.end();

});

app.get("/", function(req, res) {

    res.sendFile(__dirname + "/signup.html")

});

app.listen(process.env.PORT || 3000);

//api key: c556a1ebb233461d254c1d7a67b67f44-us1
//unoque code : 1fa3acabfe