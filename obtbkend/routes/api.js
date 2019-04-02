var express = require('express');
var router = express.Router();

function apiInit(db){
  var usersApi = require('./api/users');
  var thingsApi = require('./api/things')(db);
  var distBinApi = require('./api/distbin')(db);

  // Esto es una función Middleware
  function verificarLogin(req, res, next ){
    var isLoggedIn = req.session.logged && true;
    if(isLoggedIn){
      next();
    }else{
      res.status(403).json({"error":"No Autorizado"});
    }
  }

  router.use('/users', usersApi);
  router.use('/things', verificarLogin ,thingsApi);
  router.use('/distbin', distBinApi);
    return router;
}
module.exports = apiInit;
