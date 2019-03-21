var uuidv4 = require('uuid/v4');
var express = require('express');
var router = express.Router();

function thingsInit(db){

var fileModel = require('./jsonmodel');
var mongoModel = require('./mongoModel')(db);
var data = null; // temporary store

var bigThingTp = {
  //'_id':'',
  'desc':'',
  'fcIng':null,
  'author':'',
  'due':null,
  'done':false,
  'type': 'small' // big
};
//obtenerOneBigThing
router.get('/', function( req, res, next) {
  /// Mongo Model 
  mongoModel.getAllThings(
    function(err, docs){
      if(err) {
        console.log(err);
        return res.status(500).json({error:"Algo Paso"});
      }
      return res.status(200).json(docs);
    }
  ); // getAllThings

  //----------------------
  /// File Model
  // if(!data){
  //   fileModel.read(function(err, filedata){
  //     if(err){
  //       console.log(err);
  //       data = [];
  //       return res.status(500).json({'error':'Error al Obtener Data'});
  //     }
  //     data = JSON.parse(filedata);
  //     return res.status(200).json(data);
  //   });
  // } else {
  //   return res.status(200).json(data);
  // }
});// get /

router.get('/byid/:thingid', (req, res, next)=>{
  mongoModel.getThingById(req.params.thingid, (err, thingDoc)=>{
    if(err){
      console.log(err);
      return res.status(500).json({"error":"Error al obtener el Thing"});
    }
    return res.status(200).json(thingDoc);
  } );//getThing By Id
}); // byid:thingid

router.get('/bytags/:tag', (req, res, next)=>{
  mongoModel.searchByTag((req.params.tag || '').split('_'), (err, docs)=>{
    if(err){
      console.log(err);
      return res.status(500).json({"error":"No se encontro OBTS"});
    }else{
      return res.status(200).json(docs);
    }
  } ); //searchByTag
});// by tag


router.post('/new', function(req, res, next){
  var _thingsData = Object.assign({} , bigThingTp, req.body);
  var dateT = new Date();
  var dateD = new Date();
  dateD.setDate(dateT.getDate()+ 3);
  _thingsData.fcIng = dateT;
  _thingsData.due = dateD;
 // _thingsData._id = uuidv4();
  // Mongo Model
  mongoModel.addNewThing(_thingsData, (err, newThing)=>{
    if(err){
      console.log(err);
      return res.status(500).json({"error":"No se puede agregar Thing!"});
    }
    return res.status(200).json(newThing);
  });// addNewThing
  // -----------------------
  /// Old File Model
  // if(!data){
  //   data = [];
  // }
  // data.push(_thingsData);
  // fileModel.write(data, function(err){
  //   if(err){
  //     console.log(err);
  //     return res.status(500).json({ 'error': 'Error al Obtener Data' });
  //   }
  //   return res.status(200).json(_thingsData);
  // });
});// nuevo bigThing

router.put('/done/:thingId', function(req, res, next){
  var _thingId = req.params.thingId;
  mongoModel.toggleOBTDone(_thingId, (err, rslt)=>{
    if(err){
      console.log(err);
      return res.status(500).json({"error":"No se pudo actualizar OBT"});
    }
    return res.status(200).json(rslt);
  }); //toggleOBTDone
  // var _thingUpds = req.body;
  // var _thingUpdated = null;
  // var newData = data.map(
  //   function(doc, i){
  //     if (doc._id == _thingId){
  //       _thingUpdated = Object.assign(
  //         {},
  //         doc,
  //         {"done":true},
  //         _thingUpds
  //         );
  //       return _thingUpdated;
  //     }
  //     return doc;
  //   }
  // );// end map
  // data = newData;
  // fileModel.write(data, function (err) {
  //   if (err) {
  //     console.log(err);
  //     return res.status(500).json({ 'error': 'Error al Guardar Data' });
  //   }
  //   return res.status(200).json(_thingUpdated);
  // });
});// Set A Thing as Done

router.put('/addtags/:id', (req, res, next)=>{
  mongoModel.addTagsToThing((req.body.tags || '').split('|'), req.params.id, (err, rsult)=>{
    if(err){
      console.log(err);
      return res.status(500).json({"error":"No se puede actualizar el OBT"});
    }
    return res.status(200).json(rsult);
  });// end addTagsToThing
});// addtags



router.delete('/delete/:thingId', function(req, res, next){
  var _thingId = req.params.thingId;
  mongoModel.deleteById(_thingId, (err, result)=>{
    if(err){
      return res.status(500).json({"error":"No se pudo eliminar dato"});
    }
    return res.status(200).json(result);
  }); //deleteById
  // var newData = data.filter(
  //   function (doc, i) {
  //     if (doc._id == _thingId) {
  //       return false;
  //     }
  //     return true;
  //   }
  // );// end map
  // data = newData;
  // fileModel.write(data, function (err) {
  //   if (err) {
  //     console.log(err);
  //     return res.status(500).json({ 'error': 'Error al Guardar Data' });
  //   }
  //   return res.status(200).json({"delete": _thingId});
  // });
}); // end delete

fileModel.read(function(err , filedata){
  if(err){
    console.log(err);
  } else{
    data = JSON.parse(filedata);
  }
});

router.get('/tags', (req, res, next)=>{
  mongoModel.getTagsCounter((err, docs)=>{
    if(err) return res.status(500).json({"error":"Algo Paso"});
    return res.status(200).json(docs);
  });
});

return router;

} // thingInit

module.exports = thingsInit;
