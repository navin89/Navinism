'use strict';

module.exports = function (express, app, passport) {

    const path = require('path');
    const _app_folder = '../../../dist/client';
    const navinismServices = require('../module/dashboard/index');

    app.route('/api/picOfTheDaySvc').get(navinismServices.picOfTheDaySvc);
    app.route('/api/getPicOfTheDay').get(navinismServices.getPicOfTheDay);

    // FOR API CALL TESTING...
    app.route('/api/dockerine').get(navinismServices.dockerineSvc);
    app.route('/api/hexToRgb').get(navinismServices.getHexToRgb);
    app.route('/api/rgbToHex').get(navinismServices.getRgbToHex);

    if (process.env.DEPLOY === 'NGINX') {
        app.use(express.static('/home/navin89/app/dist/client', { maxAge: '2y' }));
        app.route('*').get( function (req, res) {
            res.sendFile(path.join('/home/navin89/app/dist/client/index.html'));
        });
    } else {
        app.use(express.static(__dirname + _app_folder, {maxAge: '2y'}));
        app.route('*').get( function (req, res) {
            res.sendFile(path.join(__dirname + _app_folder + '/index.html'));
        });
    }


};
