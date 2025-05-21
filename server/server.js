// const fs = require('fs');
// const https = require('https');
const app = require('./app');
const http = require('http');
require('dotenv').config();

const server = http.createServer(app);
// const sslServer = https.createServer(
//     {
//         key: fs.readFileSync('./ssl/server.key'),
//         cert: fs.readFileSync('./ssl/server.cert'),
//     },
//     app
// );

server.listen(5000, () => {
    console.log('Secure server running on http://localhost');
});