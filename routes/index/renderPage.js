var express = require('express');
var router = express.Router();

let mariaDB = require('../../db/connector')
let queries = require('../index/queries')

/* GET home page. */
router.get('/', function(req, res, next) {
  let connector = mariaDB.getConnection
  connector.then((conn) => {
    conn.query(queries.getVini).then((result) => {
      conn.query(queries.getDrinked).then((drinked) => {
        conn.query(queries.getTotalInfos).then((totalInfo) => {
          conn.query(queries.getDrinkedInfo).then((drinkedInfo) => {
            conn.query(queries.getAllProducers).then((producers) => {
              conn.query(queries.getAllCategories).then((categories) => {
                conn.query(queries.getAllSizes).then((sizes) => {
                  conn.query(queries.getAllPositions).then((positions) => {
                    conn.query(queries.getAllGrapes).then((grapes) => {
                      res.render('index', {
                        vini: result,
                        drinked: drinked,
                        totalInfo: totalInfo,
                        drinkedInfo: drinkedInfo,
                        producers: producers,
                        categories: categories,
                        sizes: sizes,
                        positions: positions,
                        grapes: grapes
                      });
                    })
                  })
                })
              })
            })
          })
        })
      })
    }).catch((err)=> {
      console.log(err)
    })
  })
})

module.exports = router;
