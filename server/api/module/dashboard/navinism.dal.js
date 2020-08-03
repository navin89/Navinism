'use strict';
// dotenv
const dotenv = require('dotenv');
dotenv.config();
const fs = require('fs');
const fetch = require('node-fetch');
const path = require('path');
const request = require('request');
const nasaUrl = process.env.nasa_api_url+process.env.nasa_api_key;
const dbService = require('../../database/db-service');
const util = require('../../util/util');


// TODO: REDIS MIGHT BE TAKEN OUT IN THE NEAR FUTURE!

/* REDIS */
const redis = require('redis');
const redisClient = redis.createClient({
    host: process.env.VM_IP,
    port: process.env.REDIS_PORT
}); // REDIS CLIENT

redisClient.auth(process.env.REDIS_PW, (err, reply)=> {
    if(err !== null)
        console.log(`Authentication to Redis through pw has failed!!; [Check Password]`);
    else
        console.log(`Authentication to Redis through pw is: `, reply);
});

redisClient.on('ready', ()=> {
    console.log("Redis is ready to be redissssSSsssed!");
});

redisClient.on('error',()=> {
    console.log("error in Redis");
});

// ------------------------------------------------------------

/** 3rd Party API CALLS */

/**
 * @description
 * Api call retrieves entire object for the
 * picture of the day from nasa api
 *
 * */
const picOfTheDayCall = async (header)=> {
    let options = {
        url: nasaUrl,
        header: header,
        method: "GET",
        qs: {
            api_key:process.env.nasa_api_key
        }
    };

    return new Promise((resolve, reject) => {
        request(options,(error, response, body) => {
           if (error) {
               reject(error);
               return console.error(`Pic of the day service failed: `, error);
           } else {
               resolve(body);
           }

        });
    });
}


/**
 * @description
 * get picture of the day in png format by making a network call
 * and insert into assets directory.
 *
 * @return image
 * */
const getPictureForTheDay = async (urlParam)=> {

    // TODO: NEED TO REFACTOR TO STOP NETWORK CALLS IF NOT NEEDED...
    //  For example - if the call is for the same day and just pull image from dir

    return new Promise((resolve, reject) => {
        const directory = 'api/module/assets/';

        fs.readdir(directory, (err, files) => {
            if (err) throw err;

            for (const file of files) {
                fs.unlink(path.join(directory, file), err => {
                    if (err) throw err;
                });
            }
        });

        fetch(urlParam)
            .then(
                data => {
                    const dest = fs.createWriteStream('api/module/assets/picOfTheDay.png');
                    resolve(data.body.pipe(dest));
                },
                error => {
                    console.log(error);
                    reject(error);
                })
    });
}


/** DB CALLS */

/**
 * @description
 * Method finds for existing data from DB table
 *
 * @return arrayOfObjects - the result data from DB table.
 * @return error - if finding of data invokes an error
 * */
const findPodExistenceDAL = (todayDate) => {
    return new Promise(async (resolve, reject) => {
        try {
            let findPodExistenceQuery = `SELECT * FROM apod 
                                            WHERE date_issue= '${util.escapeSingleQuote(todayDate)}'`;
            let outputDb  = await dbService.query(findPodExistenceQuery);
            resolve(outputDb);

        } catch (error) {
            console.log(`ERROR: findPodExistenceDAL(): `, error); //log error
            reject(error);
        }
    });
}

/**
 * @description
 * Method inserts POD data into DB table
 *
 * @return true - if transaction was successful
 * @return false - if transaction was un-successful
 * */
const insertPodDAL = (podObject) => {

    return new Promise(async(resolve, reject) => {
        try {
            let parsedObj = JSON.parse(podObject);
            let findPodExistenceQuery = `INSERT INTO apod (DATE_ISSUE, TITLE, COPYRIGHT, DESCRIPTION, HDURL)
            VALUES('${util.escapeSingleQuote(parsedObj.date)}', '${util.escapeSingleQuote(parsedObj.title)}', 
            '${util.escapeSingleQuote(parsedObj.copyright)}', '${util.escapeSingleQuote(parsedObj.explanation)}',
            '${util.escapeSingleQuote(parsedObj.hdurl)}' )`;
            await dbService.query(findPodExistenceQuery);
            resolve(true);

        } catch (error) {
            console.log(`ERROR: insertPodDAL(): `, error); // log error
            reject(false);
        }
    });
}




module.exports = {
    picOfTheDayCall,
    getPictureForTheDay,
    findPodExistenceDAL,
    insertPodDAL
}
