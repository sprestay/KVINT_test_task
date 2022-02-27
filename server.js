'use strict';
const express = require('express');
const m = require('./mongo');

// // Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', async (req, res) => {
    var cont = await m.find();
    res.send(cont);
});


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);