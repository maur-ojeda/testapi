// Routes.js - Módulo de rutas
var express = require('express');
var router = express.Router();



const mensajes = [{
        _id: 'XXX',
        user: 'spiderman',
        mensaje: 'holamundo como estan'
    }

];

const user = [{
    _id: '001',
    name: 'Ignacio',
    last_name: 'Peréz Rodriguez',
    email: 'ign_pe@email.com',
    rol: 'tipo_rol',
    active: '0'
}]

const fixedAssets = [{
    _id: 'XXX',
    acreedor: "acreedor",
    agnosVidaUtil: "2",
    area: "area",
    centro: "centro",
    centroCosto: "centro costo",
    claseActivoFijo: "clase activo",
    codigo: "codigo",
    codigoRfid: "rfid",
    condicion: "condicion",
    creadoPor: "persona",
    cuenta: "cuenta ",
    denominacion: "deominacion",
    edificio: "edificio",
    especie: "especie",
    fabricante: "fabricante",
    fechaCreacion: "2020-07-09-34",
    gestionHistorica: "historica",
    listaInventario: "lista inventario",
    piso: "piso",
    sala: "sala",
    sociedad: "sociedad"
}];




// Get mensajes
router.get('/', function(req, res) {
    res.json(mensajes);
});

router.get('/user', function(req, res) {
    res.json(user);
});



// Post mensajes
router.post('/', function(req, res) {
    const mensaje = {
        mensaje: req.body.mensaje,
        user: req.body.user
    };

    mensajes.push(mensaje);

    res.json({
        ok: true,
        mensaje
    });
});



module.exports = router;