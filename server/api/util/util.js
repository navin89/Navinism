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
    return text && (null !== text || '' !== text) ? text.toString().replace(/'/g, "\''") : (text ? text : '');
};

exports.getSessionUser = (req) => {
    return req.session.passport.user;
};
