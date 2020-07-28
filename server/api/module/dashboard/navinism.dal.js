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
 * get picture of the day in png format
 * and insert into assets dir
 *
 * */
const getPictureForTheDay = async (urlParam)=> {

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

/** REDIS CALLS */

/**
 * @description
 * Set appropriate keys=>value for the picture of the day
 * api call into redis cache.
 * Expiry time is 24hrs
 *
 * */
const setKeysPicOfTheDay = async ()=> {
    let imgStr;
    const directory = 'api/module/assets/';

    return new Promise((resolve, reject) => {
        fs.readdir(directory, (err, files) => {
            if (err) throw err;

            files.forEach((file)=> {
                // imgStr = file;
                redisClient.set("pic_of_the_day", file, (err, reply)=> {
                    if(err !== null){
                        console.log(`ERROR SAVING to REDIS: `, err);
                        reject(err);
                    }
                    else {
                        console.log(`Saved to REDIS: `, reply);
                        resolve(reply);
                    }

                });
            });

        });

    });
}

/**
 * @description
 * Get appropriate keys=>value for the picture of the day
 * from redis cache.
 *
 * */
const getKeysPicOfTheDay = async ()=> {

    let outputObj = { avail: null, strPic: null };

    return new Promise((resolve, reject) => {
        redisClient.get("pic_of_the_day", (err, reply)=> {

            if (err !== null) {
                console.log(`Error in getting key from REDIS: `,err);
                reject(outputObj);
            }else if (reply === null) {
                console.log(`No value for given key`);
                outputObj.avail = false;
                resolve(outputObj);
            }else {
                console.log(`Value gotten: `, reply);
                // TODO: must change to true
                outputObj.avail = false;
                outputObj.strPic = reply;
                resolve(outputObj);
            }
        });

    });
}


/** DB CALLS */

const findPodExistenceDAL = (todayDate) => {
    return new Promise(async (resolve, reject) => {
        try {
            // compare with today's date
            // console.log(`DATE REC: `, todayDate);
            let findPodExistenceQuery = `SELECT * FROM apod`;
            let outputDb  = await dbService.query(findPodExistenceQuery);
            // console.log(`OUTPUT: `, outputDb);

            resolve(outputDb);

        } catch (error) {
            console.log(`ERROR: findPodExistenceDAL(): `, error);
            reject(error);
        }
    });
}

const insertPodDAL = (podObject, todaysDate) => {

    return new Promise(async(resolve, reject) => {
        try {
            // console.log(`POD OBJECT: \n\n`, JSON.parse(podObject));
            let parsedObj = JSON.parse(podObject);
            let findPodExistenceQuery = `INSERT INTO apod (DATE_ISSUE, TITLE, COPYRIGHT, DESCRIPTION, HDURL)
            VALUES('${util.escapeSingleQuote(todaysDate)}', '${util.escapeSingleQuote(parsedObj.title)}', 
            '${util.escapeSingleQuote(parsedObj.copyright)}', '${util.escapeSingleQuote(parsedObj.explanation)}',
            '${util.escapeSingleQuote(parsedObj.hdurl)}' )`;
            let outputDb  = await dbService.query(findPodExistenceQuery);
            resolve(outputDb);

        } catch (error) {
            console.log(`ERROR: insertPodDAL(): `, error);
            reject(error);
        }
    });
}






module.exports = {
    picOfTheDayCall,
    getPictureForTheDay,
    setKeysPicOfTheDay,
    getKeysPicOfTheDay,
    findPodExistenceDAL,
    insertPodDAL
}
