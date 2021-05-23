const mariadb = require('mariadb');

const { networkInterfaces } = require('os');

const nets = networkInterfaces();
const results = []

function getIP() {
    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
            if (net.family === 'IPv4' && !net.internal) {
                if (net.address.includes('10.0.0.'))
                    results.push(net.address);
            }
        }
    }
}

async function getConnection() {
    getIP()
    let connection
    try {
        connection = mariadb.createConnection({
            host: results[0],
            port: '3307',
            user: 'root',
            password: 'Datemianche1000lire_1',
            database: 'Cantina'
        })
        console.log("Connected to MairaDB")
        return await connection
    } catch (err) {
        console.log("Error MariaDB: ", err)
    }
}

exports.getConnection = getConnection()
