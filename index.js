const http = require('http');
const fs = require('fs');
const path = require('path');
const routes = require('./routes.js');

const EventEmitter = require('events');
class MyEmitter extends EventEmitter {};
const myEmitter = new EventEmitter();
const port = 3000;

global.DEBUG = true;

myEmitter.on('route', (url) => {
    const d = new Date();
    if(DEBUG) console.log(`Route Event on: ${url} at ${d}`);
    if(!fs.existsSync(path.join(__dirname, 'logs'))) {
        fs.mkdirSync(path.join(__dirname, 'logs'));
    }
    fs.appendFile(path.join(__dirname, 'logs', 'route.log'), `Route Event on ${url} at ${d}\n`, (error) => {
        if(error) throw error;
    });
});

const server = http.createServer((request, response) => {

    if(DEBUG) console.log('Request URL', request.url);
    let path = './views/';
    switch (request.url) {
        case '/':
        case '/home':
            path += 'index.html';
            myEmitter.emit('route', path);
            routes.indexPage(path, response);
            break;
        case '/about':
            path += 'about.html';
            myEmitter.emit('route', path);
            routes.aboutPage(path, response);
            break;
        case '/contact':
            path += 'contact.html';
            myEmitter.emit('route', path);
            routes.contactPage(path, response);
            break;
        case '/events':
            myEmitter.emit('event', request.url, 'INFO', 'An event route was requested');
            response.writeHead(200, { 'Content-Type': 'text/plain' });
            response.end('An event route was requested');
            break;
        case '/folder':
            routes.createFolder(request, response);
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
