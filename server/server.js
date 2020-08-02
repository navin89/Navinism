'use strict';

const express = require('express');
const app = express();
const util = require('./api/util/index');

// body parser
const bodyParser = require('body-parser');

// cors
const cors = require('cors');

// routes
const routes = require('./api/routes/routes');

// dotenv
const dotenv = require('dotenv');
dotenv.config();

// other imports
const fs = require('fs');
const https = require('https');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
let passport = require('passport');

// CORS - Enabling cross domain request
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: '50mb'}));
// since extended is false; means we are using querystring lib
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", process.env.PORTAL_URI);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

let csp = require('express-csp-header');
app.use(csp({
    policies: {
        'default-src': [csp.SELF],
        'script-src': [csp.SELF, "'unsafe-eval'", "'unsafe-inline'"],
        'style-src': [csp.SELF, "'unsafe-inline'", 'https://fonts.googleapis.com'],
        'font-src': [csp.SELF, 'https://fonts.gstatic.com'],
        'img-src': [csp.SELF, 'data:', process.env.PORTAL_URI],
        'connect-src': [csp.SELF, process.env.PORTAL_URI]
    }
}));

let port;
if(process.env.DEPLOY === 'LOCAL' || process.env.DEPLOY === 'NGINX') {
    port = util.normalizePort(process.env.PORT || "8000");
}


app.listen(port, ()=> {
    console.log(`Server started with port:`, port);
});

routes(express, app, passport);



