var ObjectId = require('mongodb').ObjectID;

function initDistBinModel(db){
  var lib = {};
  var dbCll = db.collection('pruebaDistBinaria');
  lib.getDistBinItems = (page = 1 , amount = 20, handler)=>{
    //$lte === less than o equal to   <=
    //$gte
    //$gt
    //$lt
    //$eq
    //$ne
    /*
    1) Sacar solo ciertos atributos presentes en el documento
    2) Sacar solo la cantidad de documento que establece el parametro
    3) Esepecificar cuales n documentos quier obtener (page)
     */
    var skipDocs = (page - 1) * amount;
    dbCll
      .find({})
      .project({ "PruebaNo": 1, "Resultado":1})
      .sort({"Resultado":-1})
      .skip(skipDocs)
      .limit(amount)
      .toArray(
        (err, docs)=>{
            if(err){
              console.log(err);
              handler(err, null);
            }else{
              handler(null, docs);
            }
        }
    );//toArray
  }; // getDistBinItems


  return lib;
}

module.exports = initDistBinModel;
