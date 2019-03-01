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

  lib.addTagsToThing = (tags, id , handler) => {
    var curatedTags = Array.isArray(tags)? tags: [tags];
    var updateObject = { "$set": { "tags": curatedTags}};
    obt.updateOne({"_id": ObjectId(id)}, updateObject, (err, rsult)=>{
        if(err){
          handler(err, null);
        }else{
          handler(null, rsult.result);
        }
    } ); // updateOne
  } // addTagsToThing

  lib.searchByTag = (tags, handler)=>{
    var queryObject= {"tags": {"$in": Array.isArray(tags)? tags: [tags]}};
    obt.find(queryObject).toArray((err, docs) => {
      if(err){
        handler(err, null);
      }else{
        handler(null, docs);
      }
    }); //toArray
  } //serachByTag


  lib.toggleOBTDone = (id, handler) => {
    var filter = {"_id": ObjectId(id)};
    // get filered document
    obt.findOne(filter, (err, doc) => {
      if(err) {
        handler(err, null);
      } else {
          if(doc){
              //doc.done = !doc.done;
              //doc.fcDone = new Date();
              var updateExpression = {};
              if(doc.done){
                  updateExpression = {"$set": {done : false, fcDone:null} };
              }else{
                  updateExpression = { "$set": { done: true, fcDone:new Date() } };
              }
              obt.updateOne(filter, updateExpression, (err, rslt)=> {
                  if(err) {
                    handler(err, null);
                  }else{
                    handler(null, rslt.result);
                  }
              }); // updateOne
          }else{
            handler(new Error("El documento no Existe"), null)
          }
      }
    } );//findOne
  }
  return lib;
} // mongoModel
 module.exports = mongoModel;
