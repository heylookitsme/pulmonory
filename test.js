const http = require('http');
var url = require('url');
//var dt = require('./module');
var fs = require('fs');
const hostname = '127.0.0.1';
const fetch = require('node-fetch');
const api_keys = require('./api_key');

const express = require('express')
const app = express()
const port = 8000

app.use(express.static('public'))
app.get('/', (req, res) => res.sendFile('public/index.html'))

app.get('/md-current-data', (req, res) => {
    fetch(`http://www.airnowapi.org/aq/data/?startDate=2020-02-29T17&endDate=2020-02-29T18&parameters=PM25&BBOX=-79.559692,37.866181,-75.055297,39.766325&dataType=C&format=application/json&verbose=0&nowcastonly=0&includerawconcentrations=0&API_KEY=${api_keys["air_now"]}`, {
        method: 'GET'
    })
    .then((response) => response.json())
    .then((data) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
