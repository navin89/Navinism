'use strict';
const util = require("../../util/index");
const navinismDal = require('./navinism.dal');
const fs = require('fs');
const path = require('path');
var moment = require('moment'); // require
moment().format();

let picOfTheDayObject = {
    copyright: null,
    date: null,
    desc: null,
    title: null,
    pic: null
}

const picOfTheDaySvc = async (req, res)=> {

    let header = req.headers;
    try {
        let dataObj;
        let today = new Date(); //today
        let now = moment(today).format("YYYY-MM-DD"); //format
        dataObj = await findPodExistence(now);

        if (dataObj.length === 0) {
            const podCallResult = await navinismDal.picOfTheDayCall(header);
            await navinismDal.insertPodDAL(podCallResult);
            dataObj = await findPodExistence(now);
            await navinismDal.getPictureForTheDay(dataObj[0].hdurl);
            picOfTheDayObject.copyright = dataObj[0].copyright;
            picOfTheDayObject.date = dataObj[0].date_issue;
            picOfTheDayObject.desc = dataObj[0].description;
            picOfTheDayObject.title = dataObj[0].title;

        } else {

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

const getPicOfTheDay = async (req, res)=> {

    const directory = 'api/module/assets/';
    let imgStr =null;
    res.setHeader('Content-Type', 'multipart/form-data');

    fs.readdir(directory, (err, files) => {
        if (err) throw err;

        files.forEach((file)=> {
            imgStr = file;
        });

        let finalPath = path.join(__dirname, '../assets')
        res.status(200).sendFile( finalPath+'/'+imgStr);
    });

};

/** DB CALLS */
const findPodExistence = async (todaysDate) => {

    try {
        return await navinismDal.findPodExistenceDAL(todaysDate);
    } catch (error) {
        console.log(`ERROR findPodExistence(): ${error}`);
        return error;
    }

}


module.exports = {
      picOfTheDaySvc,
      getPicOfTheDay,
      findPodExistence
};
