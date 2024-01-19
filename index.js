const http = require('http');
const fs = require('fs');
global.DEBUG = true;

const server = http.createServer((request, response) => {
    if(DEBUG) console.log('Request URL', request.url);
    switch (request.url) {
        case '/':
            if(DEBUG) console.log('Root Route')
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end(fs.readFileSync('<h1>Welcome to the Home Page!</h1>'));
            break;
        case '/home':
            if(DEBUG) console.log('Home Route')
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end('<h1>Welcome to the Home Page!</h1>');
            break;
        case '/about':
            if(DEBUG) console.log('About Route')
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end('<h1>About Me</h1>');
            break;
        case '/contact':
            if(DEBUG) console.log('Contact Route')
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end('<h1>Contact Me</h1>');
            break;
        default:
            if(DEBUG) console.log('404 Route')
            response.writeHead(404, { 'Content-Type': 'text/html' });
            response.end('<h1>404 Page Not Found</h1>');
            break;
    }

});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});

