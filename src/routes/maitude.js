const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn, isLoggedOut } = require('../lib/auth');
router.get('/acerca', (req, res) =>{
    res.render('maitude/acerca');
});

router.get('/contenidos/:materia', isLoggedOut,(req, res) => {
    if(req.params.materia == ':0')
    res.redirect('/contenidosq0');
    if(req.params.materia == ':1')
    res.redirect('/contenidosf0');
    if(req.params.materia == ':2')
    res.redirect('/contenidosm0');

});
router.get('/contenidosq0', (req, res) => {
    res.render('maitude/qu0');
});
router.get('/contenidosq1', (req, res) => {
    res.render('maitude/qu1');
});
router.get('/contenidosq2', (req, res) => {
    res.render('maitude/qu2');
});
router.get('/contenidosq3', (req, res) => {
    res.render('maitude/qu3');
});
router.get('/contenidosq4', (req, res) => {
    res.render('maitude/qu4');
});
router.get('/contenidosq5', (req, res) => {
    res.render('maitude/qu5');
});
router.get('/contenidosq6', (req, res) => {
    res.render('maitude/qu6');
});




router.get('/contenidosf0', (req, res) => {
    res.render('maitude/fi0');
});
router.get('/contenidosf1', (req, res) => {
    res.render('maitude/fi1');
});
router.get('/contenidosf2', (req, res) => {
    res.render('maitude/fi2');
});
router.get('/contenidosf3', (req, res) => {
    res.render('maitude/fi3');
});
router.get('/contenidosf4', (req, res) => {
    res.render('maitude/fi4');
});
router.get('/contenidosf5', (req, res) => {
    res.render('maitude/fi5');
});
router.get('/contenidosf6', (req, res) => {
    res.render('maitude/fi6');
});



router.get('/contenidosm0', (req, res) => {
    res.render('maitude/ma0');
});
router.get('/contenidosm1', (req, res) => {
    res.render('maitude/ma1');
});
router.get('/contenidosm2', (req, res) => {
    res.render('maitude/ma2');
});
router.get('/contenidosm3', (req, res) => {
    res.render('maitude/ma3');
});
router.get('/contenidosm4', (req, res) => {
    res.render('maitude/ma4');
});
router.get('/contenidosm5', (req, res) => {
    res.render('maitude/ma5');
});
router.get('/contenidosm6', (req, res) => {
    res.render('maitude/ma6');
});
router.get('/contenidosm7', (req, res) => {
    res.render('maitude/ma7');
});
router.get('/contenidosm8', (req, res) => {
    res.render('maitude/ma8');
});
router.get('/contenidosm9', (req, res) => {
    res.render('maitude/ma9');
});



router.get('/actividades-Q1', (req, res) => {
    res.render('maitude/actividadq1');
});
router.get('/actividades-Q2', (req, res) => {
    res.render('maitude/actividadq2');
});
router.get('/actividades-Q3', (req, res) => {
    res.render('maitude/actividadq3');
});
router.get('/actividades-Q4', (req, res) => {
    res.render('maitude/actividadq4');
});
router.get('/actividades-Q5', (req, res) => {
    res.render('maitude/actividadq5');
});
router.get('/actividades-Q6', (req, res) => {
    res.render('maitude/actividadq6');
});



router.get('/actividades-F1', (req, res) => {
    res.render('maitude/actividadf1');
});
router.get('/actividades-F2', (req, res) => {
    res.render('maitude/actividadf2');
});
router.get('/actividades-F3', (req, res) => {
    res.render('maitude/actividadf3');
});
router.get('/actividades-F4', (req, res) => {
    res.render('maitude/actividadf4');
});
router.get('/actividades-F5', (req, res) => {
    res.render('maitude/actividadf5');
});
router.get('/actividades-F6', (req, res) => {
    res.render('maitude/actividadf6');
});


router.get('/actividades-M1', (req, res) => {
    res.render('maitude/actividadm1');
});
router.get('/actividades-M2', (req, res) => {
    res.render('maitude/actividadm2');
});
router.get('/actividades-M3', (req, res) => {
    res.render('maitude/actividadm3');
});
router.get('/actividades-M4', (req, res) => {
    res.render('maitude/actividadm4');
});
router.get('/actividades-M5', (req, res) => {
    res.render('maitude/actividadm5');
});
router.get('/actividades-M6', (req, res) => {
    res.render('maitude/actividadm6');
});
router.get('/actividades-M7', (req, res) => {
    res.render('maitude/actividadm7');
});
router.get('/actividades-M8', (req, res) => {
    res.render('maitude/actividadm8');
});
router.get('/actividades-M9', (req, res) => {
    res.render('maitude/actividadm9');
});
router.get('/terminoscon', (req, res) => {
    res.render('layouts/terminos');
});


module.exports = router;
