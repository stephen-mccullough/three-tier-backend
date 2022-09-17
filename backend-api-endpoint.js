const { res } = require('express');
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const https = require('https');

//Allows for the API endpoint to correctly parse JSON data
app.use(bodyParser.json())
app.use(function (req, res, next) {
  //console.log(req.body) 
  next()
})

var BackendButton1Count = 0;
function IncrementButton1() {
    BackendButton1Count += 1;
}

//Allows for Cross-Domain access, getting rid of no-cors catch
let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    next();
}
app.use(allowCrossDomain);

app.get('/', (req,res) => {
    res.set({
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*",
    });
    res.send('Backend Successfully Received Button1 Press');
    IncrementButton1();
    console.log("Received Increment request");
    console.log("BackendButton1Count:" + BackendButton1Count);
});

app.get('/update', (req,res) => {
    res.set({
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*",
    });
    res.send({BackendButton1Count});
    console.log("Received Update Request, Button1Count = " + BackendButton1Count);
});

app.listen(4000, () => console.log('Listening on Port 4000'))