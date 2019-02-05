var express = require('express');
var router = express.Router();
var fileModel = require('./jsonmodel');
var data = null; // temporary store

var bigThingTp = {
  'desc':'',
  'fcIng':null,
  'author':'',
  'due':null,
  'done':false,
  'type': 'small' // big
};
//obtenerOneBigThing
router.get('/', function( req, res, next) {
  if(!data){
    fileModel.read(function(err, filedata){
      if(err){
        console.log(err);
        data = [];
        return res.status(500).json({'error':'Error al Obtener Data'});
      }
      data = JSON.parse(filedata);
      return res.status(200).json(data);
    });
  } else {
    return res.status(200).json(data);
  }
});// get /

router.post('/new', function(req, res, next){
  var _thingsData = Object.assign({} , bigThingTp, req.body);
  _thingsData.fcIng = new Date;
  _thingsData.due = new Date(_thingsData.fcIng.setDate(_thingsData.fcIng.getDate()+3));
  if(!data){
    data = [];
  }
  data.push(_thingsData);
  fileModel.write(data, function(err){
    if(err){
      console.log(err);
      return res.status(500).json({ 'error': 'Error al Obtener Data' });
    }
    return res.status(200).json(_thingsData);
  });
});// nuevo bigThing

router.put('/done/:thingId', function(req, res, next){
  var _thingId = req.params.thingId;
  console.log(_thingId);
  res.json({"msg":"ok"});
});// Set A Thing as Done

module.exports = router;
