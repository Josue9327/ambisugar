const express = require('express');
const { route } = require('.');
const router = express.Router();
const helpers = require('../lib/helpers');
const passport = require('passport');
const pool = require('../database');
const { isLoggedIn, isLoggedOut } = require('../lib/auth');
router.get('/registro', isLoggedIn, (req, res) =>{
    res.render('auth/registro');
});
router.post('/registro', passport.authenticate('local.registro', {
    successRedirect: '/principal',
    failureRedirect: '/registro',
    failureFlash: true
}));

router.get('/login', isLoggedIn, (req, res) =>{
    res.render('auth/login');
});

router.post('/login', (req, res, next) =>{
    passport.authenticate('local.login', {
        successRedirect: '/principal',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
});

router.get('/logout', isLoggedOut, (req, res) =>{
    req.logOut();
    res.redirect('/login');
});
    

router.get('/principal', isLoggedOut, (req, res) => {
    res.render('maitude/principal');
});

router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'user_birthday'] }));
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/principal',
                                      failureRedirect: '/login' }));
router.get('/perfil',isLoggedOut, async (req, res) => {
res.render('auth/perfil', { username: req.user });
});

router.get('/editar',isLoggedOut, (req, res)=>{
    
    var user = req.user;

    res.render('auth/editar', {user});
});

router.post('/editar',isLoggedOut, async (req, res)=>{
    const { nombre_usuario } = req.body;
    const { apellidos_usuario } = req.body;
    const { fecha_usuario } = req.body;
    let updateuser = {
        id_usuario: req.user.id_usuario,
        nombre_usuario,
        apellidos_usuario,
        fecha_usuario
    };
    let consulta = 'CALL editar_datos(?)';
    await pool.query(consulta, [Object.values(updateuser)]);

    res.redirect('/perfil');
});

router.post('/borrar_usuario_u',isLoggedOut, async (req, res)=>{
    const { id_usuario } = req.body;
    res.redirect('/logout');
    let consulta = 'CALL Eliminar_usuario(?)';
    await pool.query(consulta, [id_usuario]);
    
});

module.exports = router;