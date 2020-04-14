const express = require('express');
const cors = require('cors');
const server = express();

// import routers here
const projectRouter = require('./projects/projectRouter');
const actionRouter = require('./actions/actionRouter');

// implement middleware
// logger?
server.use(express.json());
server.use(cors());
// server.use router here
server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);

server.get('/', (req, res) => {
    res.send(`<h2>Hello!</h2>`)
})

module.exports = server;