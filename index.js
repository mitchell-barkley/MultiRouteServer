const http = require('http');
const fs = require('fs');
const path = require('path');

const EventEmitter = require('events');
class MyEmitter extends EventEmitter {};
const myEmitter = new EventEmitter();

const routes = require('./routes.js');

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
            // fetchFile(path);
            routes.indexPage(path, response);
            break;
        case '/about':
            path += 'about.html';
            myEmitter.emit('route', path);
            // fetchFile(path);
            routes.aboutPage(path, response);
            break;
        case '/contact':
            path += 'contact.html';
            myEmitter.emit('route', path);
            // fetchFile(path);
            routes.contactPage(path, response);
            break;
        default:
            if(DEBUG) console.log('404 Route')
            response.writeHead(404, { 'Content-Type': 'text/html' });
            response.end('<h1>404 Page Not Found</h1>');
            break;
    }
    // function fetchFile(fileName) {
    //     fs.readFile(fileName, (error, content) => {
    //         if (error) {
    //             response.writeHead(500, { 'Content-Type': 'text/html' });
    //             response.end('<h1>500 Internal Server Error</h1>');
    //         } else {
    //             response.writeHead(200, { 'Content-Type': 'text/html' });
    //             response.end(content, 'utf-8');
    //         }
    //     });
    // }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
