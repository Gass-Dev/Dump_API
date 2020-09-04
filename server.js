//Imports
const express = require('express');
// const mysql = require('mysql2');

//Instantiate server
const server = express();


//Configure routes

server.get('/api', (req, res) => {
    res.setHeader('Content-Type','text/html');
    res.status(200).send('<h1>Hello! You are on my server</h1>');
} );

//Call routes


//Listen to port
const port = 8001;

//Launch server
server.listen(port, () => {
    console.log(`Hello, You are listening Server ${port} :)`);
});

// module.exports = server;