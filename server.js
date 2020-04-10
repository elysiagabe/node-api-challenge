const express = require('express');

const server = express();

// import routers here

// implement middleware
// logger?
server.use(express.json());
// server.use router here

server.get('/', (req, res) => {
    res.send(`<h2>Hello!</h2>`)
})

module.exports = server;