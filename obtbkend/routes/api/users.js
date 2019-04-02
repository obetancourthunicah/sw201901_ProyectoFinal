// Framework que permite configurar
// las respuestas del web server
var express= require('express');

// objeto que permite declara la
// rutas que se van a manejar
// en el web server
var router = express.Router();

/*
HTTP   |   router method |
------------------------ -----------
GET     |   router.get    |  Consulta
POST    |   router.post   |  Nuevo
PUT     |   router.put    |  Actualizar
DELETE  |   router.delete |  Borrar
 */

router.post('/new', function(req, res, next){
  var _userData = req.body;
  console.log(_userData);
  res.json({"msg":"ok"});
}); // post new


router.post('/login', function(req, res, next){
  var _userData = req.body;
  if(req.body.email === "obetancourthunicah@gmail.com"
    && req.body.password ==="HolaMundo1234.%33") {
        req.session.logged = true;
        req.session.loggeduser = req.body.email;
        res.status(200).json({"msg":"ok"});
    } else {
        res.status(403).json({"error":"Credenciales no válidas"});
    }
});// post login

router.get('/logout', function (req, res, next) {
  var _userData = req.body;
  req.session.logged=false;
  req.session.loggeduser = null;
  res.json({ "msg": "ok" });
});// post login

router.get('/session', function (req, res, next) {
  res.json({ "active": req.session.logged && true});
});// post login

module.exports = router;
