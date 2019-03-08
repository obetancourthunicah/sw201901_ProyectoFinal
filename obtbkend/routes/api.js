var express = require('express');
var router = express.Router();

function apiInit(db){
  var usersApi = require('./api/users');
  var thingsApi = require('./api/things')(db);
  var distBinApi = require('./api/distbin')(db);

  router.use('/users', usersApi);
  router.use('/things', thingsApi);
  router.use('/distbin', distBinApi);
    return router;
}
module.exports = apiInit;
