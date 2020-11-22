let mariaDB = require('../../db/connector')

exports.getWines = (req, res) => {
    let connector = mariaDB.getConnection
    connector.then((conn) => {
        conn.query("select vini.id_vino, vini.nome, annata, quantita, d.size, nome_categoria, l.nome luogo, tipo, p.nome_produttore, comment from vini left join dimensioni d on vini.id_dimensione = d.id_dimensione left join categoria c on vini.id_categoria = c.id_categoria left join luogo l on vini.id_luogo = l.id_luogo left join produttore p on vini.id_produttore = p.id_produttore left join tipo t on vini.id_tipo = t.id_tipo where finito IS NULL").then((result) => {
            res.send(result)
        })
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500)
    })
}

exports.getDrinkedWines = (req, res) => {
    let connector = mariaDB.getConnection
    connector.then((conn) => {
        conn.query("select bevuti.id_bevuti, bevuti.nome, annata, quantita, d.size, nome_categoria, l.nome luogo, tipo, p.nome_produttore, comment from bevuti left join dimensioni d on bevuti.id_dimensione = d.id_dimensione left join categoria c on bevuti.id_categoria = c.id_categoria left join luogo l on bevuti.id_luogo = l.id_luogo left join produttore p on bevuti.id_produttore = p.id_produttore left join tipo t on bevuti.id_tipo = t.id_tipo").then((result) => {
            res.send(result)
        })
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500)
    })
}

exports.getProducers = (req, res) => {
    let connector = mariaDB.getConnection
    connector.then((conn) => {
        conn.query("select * from produttore").then((result) => {
            res.send(result)
        })
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500)
    })
}

exports.getTipo = (req, res) => {
    let connector = mariaDB.getConnection
    connector.then((conn) => {
        conn.query("select * from tipo").then((result) => {
            res.send(result)
        })
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500)
    })
}

exports.getSize = (req, res) => {
    let connector = mariaDB.getConnection
    connector.then((conn) => {
        conn.query("select * from dimensioni").then((result) => {
            res.send(result)
        })
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500)
    })
}

exports.getCategory = (req, res) => {
    let connector = mariaDB.getConnection
    connector.then((conn) => {
        conn.query("select * from categoria").then((result) => {
            res.send(result)
        })
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500)
    })
}

exports.getPosition = (req, res) => {
    let connector = mariaDB.getConnection
    connector.then((conn) => {
        conn.query("select * from luogo").then((result) => {
            res.send(result)
        })
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500)
    })
}