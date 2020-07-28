var parse = require('pg-connection-string').parse;
var config = parse('postgres://navin89:defaultSystem@89@157.245.197.124:9889/navinism');
const connectionString = 'postgresql://navin89:defaultSystem@89@157.245.197.124:9889/navinism'
const { Pool, Client } = require('pg');

const pool = new Pool({
    connectionString: connectionString,
});

pool.query('SELECT NOW()', (err, res) => {
    if(err) {

        console.log(`ERROR: `, err);
        pool.end()

    } else {
        // console.log(`SUCCESS DB: `, res);
        pool.end()
    }
});

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



