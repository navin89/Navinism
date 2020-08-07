var parse = require('pg-connection-string').parse;
const connectionString = process.env.DB_CONN;
const { Pool, Client } = require('pg');

// const pool = new Pool({
//     connectionString: connectionString,
// });
//
// pool.query('SELECT NOW()', (err, res) => {
//     if(err) {
//
//         console.log(`ERROR: `, err);
//         pool.end()
//
//     } else {
//         // console.log(`SUCCESS DB: `, res);
//         pool.end()
//     }
// });

const query = (sqlQuery) => {

    return new Promise(async (resolve, reject) => {
        try {
            const client = new Client({
                connectionString: connectionString,
            });

            client.connect();

            const res = await client.query(sqlQuery);
            resolve(res.rows);

        }catch (error) {
            console.log(`ERROR: `, error.stack);
            reject(error);
        }
    });

}

module.exports = {
    query
}



