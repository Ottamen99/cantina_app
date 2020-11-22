exports.getVini = "select vini.id_vino, vini.nome, annata, quantita, d.size, nome_categoria, l.nome luogo, tipo, p.nome_produttore, comment from vini left join dimensioni d on vini.id_dimensione = d.id_dimensione left join categoria c on vini.id_categoria = c.id_categoria left join luogo l on vini.id_luogo = l.id_luogo left join produttore p on vini.id_produttore = p.id_produttore left join tipo t on vini.id_tipo = t.id_tipo where finito IS NULL"

exports.getDrinked = "select bevuti.id_bevuti, bevuti.nome, annata, quantita, d.size, nome_categoria, l.nome luogo, tipo, p.nome_produttore, comment from bevuti left join dimensioni d on bevuti.id_dimensione = d.id_dimensione left join categoria c on bevuti.id_categoria = c.id_categoria left join luogo l on bevuti.id_luogo = l.id_luogo left join produttore p on bevuti.id_produttore = p.id_produttore left join tipo t on bevuti.id_tipo = t.id_tipo"

exports.getTotalInfos = "select sum(quantita) bottiglie, sum(quantita * d.size) litri from vini left join dimensioni d on vini.id_dimensione = d.id_dimensione"

exports.getDrinkedInfo = "select sum(quantita) bottiglie, sum(quantita * d.size) litri from bevuti left join dimensioni d on bevuti.id_dimensione = d.id_dimensione"

exports.getAllProducers = "select * from produttore ORDER BY nome_produttore ASC"

exports.getAllCategories = "select * from categoria"

exports.getAllSizes = "select * from dimensioni"

exports.getAllPositions = "select * from luogo"

exports.getAllGrapes = "select * from tipo"

exports.checkIfExists = "select * from vini where nome = ? and id_tipo = ? and annata = ? and id_dimensione = ? and id_categoria = ? and id_luogo = ? and id_produttore = ?"

exports.insertNewWine = "insert into vini(nome, id_tipo, annata, quantita, id_dimensione, id_categoria, id_luogo, id_produttore, comment) values(?, ?, ?, ?, ?, ?, ?, ?, ?)"

exports.updateFinishedWine = "update vini set finito = null, quantita = ? where id_vino = ?"

exports.updateWine = "update vini set quantita = quantita + ? where id_vino = ?"

exports.insertNewProducer = "insert into produttore(nome_produttore) values(?)"
