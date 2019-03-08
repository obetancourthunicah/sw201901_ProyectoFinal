var express = require('express');
var router = express.Router();


function initDistBin(db){
  var dBinModel = require('./distbinModel')(db);
  router.get('/gettests/:page/:amount', (req, res, next)=>{
      dBinModel.getDistBinItems(parseInt(req.params.page),parseInt(req.params.amount),
      (err, docs)=>{
        if(err){
          return res.status(500).json({"error":"No se pudo obtener items"});
        }
        return res.status(200).json(docs);
      });//getDistBinItems
  });//getTests

  return router;
}

module.exports = initDistBin;
