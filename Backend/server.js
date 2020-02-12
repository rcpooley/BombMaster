const fs = require('fs');
const path = require('path');
const express = require('express');
const http = require('http');
const config = require('./config.json');

const staticPath = path.join(__dirname, '../dist');

const app = express();
app.use((req, res, next) => {
    const staticFiles = fs.readdirSync(staticPath);
    if (staticFiles.includes(req.path.substring(1))) {
        next();
    } else {
        res.sendFile(path.join(staticPath, 'index.html'));
    }
});
app.use(express.static(staticPath));

const server = http.createServer(app);
server.listen(config.port, () => {
    console.log(`Listening on *:${config.port}`);
});
