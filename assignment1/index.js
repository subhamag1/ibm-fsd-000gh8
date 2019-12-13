const express = require('express');
const server = express();
const parser = require('body-parser');
const cors = require('cors');


const userAPis = require('./apis/user.api').routes;



server.use(parser.json());
server.use(cors());

// apis
server.get('/status', (rq, rs) => {
    rs.status(200).json({
        message: 'Server is Running'
    });
});

server.use('/users', userAPis);

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Server is Started at ${PORT}`);
});