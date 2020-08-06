'use strict';

let navinismService = require('./navinismService');

module.exports = {
    dockerineSvc: navinismService.dockerineSvc,
    picOfTheDaySvc: navinismService.picOfTheDaySvc,
    getPicOfTheDay: navinismService.getPicOfTheDay
};
