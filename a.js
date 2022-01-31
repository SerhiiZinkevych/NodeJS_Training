const http = require('http');
const path = require('path');

http.createServer((req, res) => {
    res.write(path.dirname(__filename));
    res.end();
}).listen(8080);
