'use strict';

exports.normalizePort = val => {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

exports.getErrorMessage = err => {
    return {
        error: JSON.stringify(err.stack)
    };
};

exports.logger = (logMessage, additionalData, req) => {
    let log = {
        msg: logMessage,
        context: additionalData,
        user: req ? req.session.passport.user.id : ''
    };

    require('log-timestamp');
    console.log(JSON.stringify(log));
};

exports.assembleResponse = (status, data) => {
    return {
        status,
        data
    };
};

exports.escapeSingleQuote = (text) => {
    return text && true ? text.toString().replace(/'/g, "\''") : (text ? text : '');
};

exports.getSessionUser = (req) => {
    return req.session.passport.user;
};

/**
 * @description
 * Color converter for RGB to hexadecimal color conversion.
 * It takes three arguments and returns a string that
 * represents the color in its hexadecimal representation
 *
 * Using the toString method of the incoming numbers,
 * combined with the number 16, to invoke a conversion to hexadecimal representation
 *
 * */
exports.rgbToHex = function(red, green, blue) {

    var redHex   = red.toString(16);
    var greenHex = green.toString(16);
    var blueHex  = blue.toString(16);

    return pad(redHex) + pad(greenHex) + pad(blueHex);

};


/**
 * @description
 * Padding the resulting value with a zero prefix if it is only
 * one character long because a valid hexadecimal representation
 * must always contain two characters
 *
 * */
function pad(hex) {
    return (hex.length === 1 ? "0" + hex : hex);
}


/**
 * @description
 * Converts from hexadecimal to RGB representation,
 * we will use the parseInt function with the base 16
 * to convert parts of the incoming strings into valid decimal RGB values.
 *
 * */
exports.hexToRgb = function(hex) {

    var red   = parseInt(hex.substring(0, 2), 16);
    var green = parseInt(hex.substring(2, 4), 16);
    var blue  = parseInt(hex.substring(4, 6), 16);

    return [red, green, blue];

};
