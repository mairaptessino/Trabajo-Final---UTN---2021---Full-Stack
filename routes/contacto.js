var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('contacto', {
    isContacto: true
  });
});

router.post('/', async (req, res, next) => {
  console.log(req.body);

  var nombre = req.body.nombre;
  var email = req.body.email;
  var tel = req.body.tel;
  var comentarios = req.body.comentarios;

  var obj ={
    to: 'mairap2014@gmail.com',
    subject: 'CONTACTO WEB',
    html: nombre + ' se contactó a través de la página y quiere obtener más información sobre tus productos a este correo: ' + email +'.<br/> Además hizo el siguiente comentario: ' + comentarios +'.<br/> Y su teléfono es ' + tel
  }

  var transport = nodemailer.createTransport({
    host:process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth:{
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })

    var info = await transport.sendMail (obj);

    
    res.render ('contacto', {
      message:'Mensaje enviado correctamente'
    });
})


  

module.exports = router;
