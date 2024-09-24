var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var server = http.createServer((req, res) => {
    var result = url.parse(req.url, true);
    let fp = result.pathname;
    let _fp = fp.substring(7, fp.length);
    console.log('open file:' + _fp);
    if (_fp.length === 0) {
        _fp = "index.html";
    } else {
        _fp = "static"+_fp;
    }
    fs.readFile(_fp, function (err, data) {
        console.log('read file:' + _fp);
        if (!err) {
            res.writeHead(200, { 'Content-Type': '*/*' });
            res.write(data);
            res.end();
        } else {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.write('not found');
            res.end();
        }
    });
}).listen(2333, '127.0.0.1');
console.log('server running on http:127.0.0.1:2333/ ...');

