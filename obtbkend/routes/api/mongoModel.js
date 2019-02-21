var ObjectId = require("mongodb").ObjectID;

function mongoModel(db){
  var lib = {};
  var obt = db.collection('things');

  lib.getAllThings = (handler)=>{
      obt.find({}).toArray(
        (err , docs) => {
          if(err){
            handler(err, null);
          }else{
            handler(null, docs);
          }
        }
       ); //toArray
  } //getAllThings

  lib.getThingById = (thingId, handler)=>{
    obt.findOne({ "_id": new ObjectId(thingId)}, (err, doc)=>{
        if(err){
          handler(err, null);
        }else{
          handler(null, doc);
        }
      }); // findOne
  } // getThingById


  lib.addNewThing = (newThing, handler)=>{
    obt.insertOne(newThing, (err, r)=>{
      if(err){
        handler(err, null);
      }else{
        handler(null, r.result);
      }
    }); //insert One
  }// addNewThing

  return lib;
} // mongoModel
 module.exports = mongoModel;
