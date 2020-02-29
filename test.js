const http = require('http');
var url = require('url');
//var dt = require('./module');
var fs = require('fs');
const hostname = '127.0.0.1';

const express = require('express')
const app = express()
const port = 8000

app.use(express.static('public'))
app.get('/', (req, res) => res.sendFile('/var/www/html/public/index.html'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))



