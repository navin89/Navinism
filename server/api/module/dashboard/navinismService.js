'use strict';
const util = require("../../util/index");
const navinismDal = require('./navinism.dal');
const fs = require('fs');
const path = require('path');

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
        let today = new Date();
        const findPodCallResult = await findPodExistence(today.toISOString());
        console.log(`RESULT FOUND: `,findPodCallResult);


        if (findPodCallResult === true) {
            const podCallResult = await navinismDal.picOfTheDayCall(header);
            await navinismDal.insertPodDAL(podCallResult, today.toISOString());
            let dataObj = JSON.parse(podCallResult);
            // console.log(`\n\nURL: `, dataObj);
            await navinismDal.getPictureForTheDay(dataObj.hdurl);
            // set to redis using dal
            // await navinismDal.setKeysPicOfTheDay();

            picOfTheDayObject.copyright = dataObj.copyright;
            picOfTheDayObject.date = dataObj.date;
            picOfTheDayObject.desc = dataObj.explanation;
            picOfTheDayObject.title = dataObj.title;

            res.send(util.assembleResponse(200, JSON.stringify(picOfTheDayObject)));
        }

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
        const retValue = await navinismDal.findPodExistenceDAL(todaysDate);
        return retValue.length !== 0;

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
