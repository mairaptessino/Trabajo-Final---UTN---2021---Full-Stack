var express = require('express');
var router = express.Router();
var novedadesModel = require('../../models/novedadesModel');

router.get('/', async function (req, res, next) {
    var novedades = await novedadesModel.getNovedades();


    res.render('admin/novedades', {
        layout: 'admin/layout',
        usuario: req.session.nombre,
        novedades
    });
});

router.get('/eliminar/:id', async (req, res, next) => {
    var id = req.params.id;
    await novedadesModel.deleteNovedadesByID(id);
    res.redirect('/admin/novedades');
});


router.get('/agregar', (req, res, next) => {
    res.render('admin/agregar', {
        layout: 'admin/layout'
    });
});

router.post('/agregar', async (req, res, next) => {
    try {
        console.log(req.body);
        if (req.body.producto != "" && req.body.descripcion != "" && req.body.precio != "") {
            await novedadesModel.insertNovedad(req.body);
            res.redirect('/admin/novedades')
        } else {
            res.render('admin/agregar', {
                layout: 'admin/layout',
                error: true,
                message: 'Por favor, completa todos los campos'
            })
        }
    } catch (error) {
        console.log(error);
        res.render('admin/agregar', {
            layout: 'admin/layout',
            error: true,
            message: 'No se cargó el producto'
        })
    }
})

router.get('/modificar/:id', async (req, res, next) => {
    var id = req.params.id;
    var novedades = await novedadesModel.getNovedadesById(id);

    res.render('admin/modificar', {
        layout: 'admin/layout',
        novedades
    });
});

router.post('/modificar', async (req, res, next) => {
    try {
        var obj = {
            producto: req.body.producto,
            descripcion: req.body.descripcion,
            precio: req.body.precio
        }
        console.log(obj)
        await novedadesModel.modificarNovedadbyId(obj, req.body.id);
        res.redirect('/admin/novedades')

    } catch (error){
        console.log(error)
        res.render('admin/modificar', {
            layout: 'admin/layout',
            error: true,
            message: 'No se modificó el producto'
    })
}
})




module.exports = router;