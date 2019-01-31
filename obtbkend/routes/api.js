var express = require('express');
var router = express.Router();

var usersApi = require('./api/users');
var thingsApi = require('./api/things');

router.use('/users', usersApi);
router.use('/things', thingsApi);

module.exports = router;
