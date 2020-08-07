'use strict';
const util = require("../../util/index");
const navinismDal = require('./navinism.dal');
const fs = require('fs');
const path = require('path');
const momentTZ = require('moment-timezone');
const moment = require('moment');
moment().format();


/**
 * @description
 *
 * */
let picOfTheDayObject = {
    copyright: null,
    date: null,
    desc: null,
    title: null,
    isPicAvail: null
}

/**
 * @description
 *
 *
 * */
const picOfTheDaySvc = async (req, res)=> {

    let header = req.headers;
    try {
        let dataObj;
        let today = new Date();
        let conv = momentTZ.tz(today, "America/New_York"); //today formatted back to America's timezone!
        let now = conv.format("YYYY-MM-DD"); //format to YYYY-MM-DD
        dataObj = await findPodExistence(now);

        if (dataObj.length === 0) {
            const podCallResult = await navinismDal.picOfTheDayCall(header);
            await navinismDal.insertPodDAL(podCallResult);
            dataObj = await findPodExistence(now);

            JSON.parse(dataObj[0].hdurl).dataUrl.length !== 0 ?
                await navinismDal.getPictureForTheDay(JSON.parse(dataObj[0].hdurl).dataUrl[0]) : picOfTheDayObject.isPicAvail = false;
            picOfTheDayObject.copyright = dataObj[0].copyright;
            picOfTheDayObject.date = dataObj[0].date_issue;
            picOfTheDayObject.desc = dataObj[0].description;
            picOfTheDayObject.title = dataObj[0].title;


        } else {

            picOfTheDayObject.isPicAvail = true;
            picOfTheDayObject.copyright = dataObj[0].copyright;
            picOfTheDayObject.date = dataObj[0].date_issue;
            picOfTheDayObject.desc = dataObj[0].description;
            picOfTheDayObject.title = dataObj[0].title;
        }

        res.send(util.assembleResponse(200, JSON.stringify(picOfTheDayObject)));

    } catch (e) {
        console.log(`ERROR: ${e.getErrorMessage}`);
        res.status(500).send(e);
    }

};


/**
 * @description
 *
 *
 * */
const getPicOfTheDay = async (req, res, next)=> {

    const directory = 'api/module/assets/';
    let imgStr =null;
    res.setHeader('Content-Type', 'multipart/form-data');
    let options = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    }

    fs.readdir(directory, (err, files) => {
        if (err) throw err;

        files.forEach((file)=> {
            imgStr = file;
        });

        let finalPath = path.join(__dirname, '../assets')
        res.status(200).sendFile( finalPath+'/'+imgStr, options, function (err) {
            if (err) {
                next(err)
            } else {
                console.log('Sent-[POD Image File]: ', finalPath+'/'+imgStr)
            }
        });
    });

};

/**
 * @description
 *
 * Finds for the picture of the day record
 * whether it exists currently on database
 * */
const findPodExistence = async (todaysDate) => {
    try {
        return await navinismDal.findPodExistenceDAL(todaysDate);
    } catch (error) {
        console.log(`ERROR findPodExistence(): ${error}`);
        return error;
    }
}


/**
 * @description
 * TESTING PURPOSES
 * */
const dockerineSvc = async (req, res, err) => {
    try {
        let tempObj = {message: "Dockerine service route is working!"};
        res.send(util.assembleResponse(200, tempObj));
    } catch (error) {
        console.log(`ERROR dockerineSvc(): ${error}`);
        return error;
    }
}


module.exports = {
  dockerineSvc,
  picOfTheDaySvc,
  getPicOfTheDay,
  findPodExistence
};
