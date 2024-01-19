const http = require('http');
const fs = require('fs');
global.DEBUG = true;

const server = http.createServer((request, response) => {
    if(DEBUG) console.log('Request URL', request.url);
    let filename = 'index.html';
    switch (request.url) {
        case '/':
        case '/home':
            if(DEBUG) console.log('Root Route')
            filename = './index.html';
            fetchFile(filename)
            break;
        case '/about':
            if(DEBUG) console.log('About Route')
            filename = './about.html';
            fetchFile(filename)
            break;
        case '/contact':
            if(DEBUG) console.log('Contact Route')
            filename = './contact.html';
            fetchFile(filename)
            break;
        default:
            if(DEBUG) console.log('404 Route')
            response.writeHead(404, { 'Content-Type': 'text/html' });
            response.end('<h1>404 Page Not Found</h1>');
            break;
    }
    function fetchFile(fileName) {
        fs.readFile(fileName, (error, content) => {
            if (error) {
                response.writeHead(500, { 'Content-Type': 'text/html' });
                response.end('<h1>500 Internal Server Error</h1>');
            } else {
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.end(content, 'utf-8');
            }
        });
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});

