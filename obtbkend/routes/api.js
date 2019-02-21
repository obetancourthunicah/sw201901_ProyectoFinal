var express = require('express');
var router = express.Router();

function apiInit(db){
  var usersApi = require('./api/users');
  var thingsApi = require('./api/things')(db);

  router.use('/users', usersApi);
  router.use('/things', thingsApi);
    return router;
}
module.exports = apiInit;
