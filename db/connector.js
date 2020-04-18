const mariadb = require('mariadb');

async function getConnection() {
    let connection
    try {
        connection = mariadb.createConnection({
            host: '192.168.1.9',
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
