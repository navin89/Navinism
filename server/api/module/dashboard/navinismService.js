'use strict';
const util = require("../../util/index");
const navinismDal = require('./navinism.dal');

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
        // Check for existence in REDIS
        let isAvail = await navinismDal.getKeysPicOfTheDay();
        if (isAvail.avail) {

        } else {
            const results = await navinismDal.picOfTheDayCall(header);
            let dataObj = JSON.parse(results);
            console.log(`\n\nURL: `, dataObj.hdurl);
            await navinismDal.getPictureForTheDay(dataObj.hdurl);
            // set to redis using dal
            await navinismDal.setKeysPicOfTheDay();

            picOfTheDayObject.copyright = dataObj.copyright;
            picOfTheDayObject.date = dataObj.date;
            picOfTheDayObject.desc = dataObj.explanation;
            picOfTheDayObject.pic = isAvail.strPic;
            picOfTheDayObject.title = dataObj.title;

            console.log(`PIC OF THE DAY: `, picOfTheDayObject);
            res.send(util.assembleResponse(200, JSON.stringify(picOfTheDayObject)));
        }

    } catch (e) {
        console.log(`ERROR: ${e.getErrorMessage}`);
        res.status(500).send(e);
    }


};

module.exports = {
  picOfTheDaySvc
};
