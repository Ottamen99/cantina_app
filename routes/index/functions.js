let mariaDB = require('../../db/connector')
let queries = require('../index/queries')

exports.drinkWine = (req, res) => {
    let connector = mariaDB.getConnection
    connector.then((conn) => {
        conn.query("select * from bevuti where id_vino = ?", [req.body.vino]).then((exists) => {
            if (!exists[0]) {
                conn.query("select * from vini where id_vino = ?", [req.body.vino]).then((result) => {
                    if (result[0].quantita - 1 === 0) {
                        conn.query("update vini set quantita = ? where id_vino = ?", [result[0].quantita - 1, result[0].id_vino]).then(() => {
                            conn.query("update vini set finito = 1 where id_vino = ?", [result[0].id_vino]).then(() => {
                                conn.query("insert into bevuti(nome, id_tipo, annata, quantita, id_dimensione, id_categoria, id_luogo, id_produttore, comment, id_vino) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [result[0].nome, result[0].id_tipo, result[0].annata, 1, result[0].id_dimensione, result[0].id_categoria, result[0].id_luogo, result[0].id_produttore, result[0].comment, result[0].id_vino]).then(() => {
                                    console.log("FINITO")
                                })
                            })
                        })
                    } else {
                        conn.query("update vini set quantita = ? where id_vino = ?", [result[0].quantita - 1, result[0].id_vino]).then(() => {
                            conn.query("insert into bevuti(nome, id_tipo, annata, quantita, id_dimensione, id_categoria, id_luogo, id_produttore, comment, id_vino) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [result[0].nome, result[0].id_tipo, result[0].annata, 1, result[0].id_dimensione, result[0].id_categoria, result[0].id_luogo, result[0].id_produttore, result[0].comment, result[0].id_vino]).then(() => {
                                console.log("INSERTED")
                            })
                        })
                    }
                })
            } else {
                conn.query("select * from vini where id_vino = ?", [req.body.vino]).then((result) => {
                    if (result[0].quantita - 1 === 0) {
                        conn.query("update vini set finito = 1 where id_vino = ?", [result[0].id_vino]).then(() => {
                            conn.query("update vini set quantita = ? where id_vino = ?", [result[0].quantita - 1, result[0].id_vino]).then(() => {
                                conn.query("update bevuti set quantita = ? where id_bevuti = ?", [exists[0].quantita + 1, exists[0].id_bevuti]).then(() => {
                                    console.log("EXISTS")
                                    console.log("FINITO")
                                })
                            })
                        })
                    } else {
                        conn.query("update vini set quantita = ? where id_vino = ?", [result[0].quantita - 1, result[0].id_vino]).then(() => {
                            conn.query("update bevuti set quantita = ? where id_bevuti = ?", [exists[0].quantita + 1, exists[0].id_bevuti]).then(() => {
                                console.log("EXISTS")
                            })
                        })
                    }
                })
            }
            res.sendStatus(200)
        }).catch((err) => {
            res.sendStatus(500)
            console.log(err)
        })
    })
}

exports.inserNewWine = (req, res) => {
    if (req.body.nome && req.body.idTipo && req.body.annata && req.body.quantita && req.body.idDimensione && req.body.idCategoria && req.body.idLuogo && req.body.idProduttore) {
        let connector = mariaDB.getConnection
        connector.then((conn) => {
            conn.query(queries.checkIfExists, [req.body.nome, req.body.idTipo, req.body.annata, req.body.idDimensione, req.body.idCategoria, req.body.idLuogo, req.body.idProduttore]).then((result) => {
                if (result[0]) {
                    if (result[0].quantita === 0) {
                        conn.query(queries.updateFinishedWine, [req.body.quantita, result[0].id_vino]).then(() => {
                            res.sendStatus(204)
                        })
                    } else {
                        conn.query(queries.updateWine, [req.body.quantita, result[0].id_vino]).then(() => {
                            res.sendStatus(204)
                        })
                    }
                } else {
                    conn.query(queries.insertNewWine, [req.body.nome, req.body.idTipo, req.body.annata, req.body.quantita, req.body.idDimensione, req.body.idCategoria, req.body.idLuogo, req.body.idProduttore, req.body.comment]).then(() => {
                        res.sendStatus(201)
                    }).catch((err) => {
                        console.log(err)
                        res.sendStatus(500)
                    })
                }
            })
        })
    } else {
        res.sendStatus(409)
    }
}

exports.insertProducer = (req, res) => {
    if (req.body.nome) {
        let connector = mariaDB.getConnection
        connector.then((conn) => {
            conn.query(queries.insertNewProducer, [req.body.nome]).then(() => {
                conn.query("select last_insert_id() as 'lastId'", []).then((lastId) => {
                    res.send(lastId)
                }).catch((err) => {
                    console.log(err)
                    res.sendStatus(500)
                })
            }).catch((err) => {
                console.log(err)
                res.sendStatus(500)
            })
        })
    }
}

exports.insertGrapes = (req, res) => {
    if (req.body.nome) {
        let connector = mariaDB.getConnection
        connector.then((conn) => {
            conn.query(queries.insertNewGrapes, [req.body.nome]).then(() => {
                conn.query("select last_insert_id() as 'lastId'", []).then((lastId) => {
                    res.send(lastId)
                }).catch((err) => {
                    console.log(err)
                    res.sendStatus(500)
                })
            }).catch((err) => {
                console.log(err)
                res.sendStatus(500)
            })
        })
    }
}
