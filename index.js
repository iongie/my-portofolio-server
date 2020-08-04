const express = require('express');
// TODO: Node.js express
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');
const socket = require('socket.io');
const fs = require('fs');
const path = require('path');
const https = require('https');
const { start } = require('repl');

// TODO: Setup Port
const port = 443; //! for production;
const portDev = 3000; //! for development;

class Server {

    constructor() {
        this.initView();
        this.router();
        // this.proxy();
        this.initExpressMiddleware();
        this.server();
    }

    server(){
        // TODO: Setup Server (Production)
        // const server = https.createServer({
        //   key: fs.readFileSync('/etc/letsencrypt/live/gigihsantoso.id/privkey.pem', 'utf8'),
        //   cert: fs.readFileSync('/etc/letsencrypt/live/gigihsantoso.id/cert.pem', 'utf8'),
        //   ca: fs.readFileSync('/etc/letsencrypt/live/gigihsantoso.id/chain.pem', 'utf8'),
        //   fullChain: fs.readFileSync('/etc/letsencrypt/live/gigihsantoso.id/fullchain.pem', 'utf8'),
        // }, app)
        // .listen(port, function () {
        //   console.log('Example app listening on port 443! Go to https://gigihsantoso.id/')
        // })

        // TODO: Setup Server (Development)
        const server = app.listen(portDev, () => console.log(`Hello world app listening on port ${portDev}!`));
        // TODO: Socket Setup
        app.io = socket(server, { serveClient: false });
    }

    proxy() {
        app.enable("trust proxy");
        app.use(function(request, response){
            if(!request.secure){
            response.redirect("https://" + request.headers.host + request.url);
            }
        });
    }

    initExpressMiddleware(){
        // TODO: Automatically allow cross-origin requests
        app.use(cors());

        // TODO: for parsing application/json
        app.use(bodyParser.json()); 

        // TODO: for parsing application/xwww-form-urlencoded
        app.use(bodyParser.urlencoded({ extended: true }));

        // TODO: for parse an HTML body into a string
        app.use(bodyParser.text({ type: 'text/html' }))

        // TODO: for parsing buffer raw
        app.use(bodyParser.raw());
    }

    initView() {
        app.use(express.static('public'));
        app.use('/file', express.static('storage'));
    }

    router(){

    }

}

new Server();