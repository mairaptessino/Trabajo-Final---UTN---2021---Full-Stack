var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('compras', {
    isCompras: true
   });
});

module.exports = router;
