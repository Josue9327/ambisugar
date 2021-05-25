const express = require('express');
const { query } = require('../database');
const router = express.Router();
const pool = require('../database')
const {v4: uuidV4} = require('uuid');
const { isLoggedIn, isLoggedOut } = require('../lib/auth');
router.get('/chat', isLoggedOut,(req, res) =>{
    res.render('chat/principal', { username: req.user });
});
router.get('/elegirchat', isLoggedOut, async(req, res) =>{
    const amigos = await pool.query('SELECT * FROM AMIGOS WHERE correo_usuario = ?', [req.user.correo_usuario]);
    const obj = {};
    for (let i = 0; i < amigos.length; i++) {
        obj[i] = amigos[i];        
    }
    res.render('chat/menu', {obj});
});

router.post('/elegirchat', async(req, res) => {
    usuario_chat = req.body.chat_usuario;
    correo = req.user.correo_usuario;
    const rows = await pool.query('SELECT * FROM usuario WHERE correo_usuario = ?', [usuario_chat]);

    const id_c = await pool.query('SELECT * FROM amigos WHERE correo_usuario = ? AND correo_amigo = ?', [correo, usuario_chat]);
    console.log(id_c);
    if (rows.length > 0 ){
        
        const usuarios = {
            micorreo: req.user.correo_usuario,
            sucorreo: rows[0].correo_usuario,
            sunombre: rows[0].nombre_usuario,
            minombre: req.user.nombre_usuario,
            id_chat: id_c[0].id_video
        }
      res.render('chat/principal', {usuarios});
    } else{
        req.flash('message','<center><p style="color:white";>Usuario no encontrado</p></center>');
        res.redirect('/elegirchat');
    }
});


router.post('/agregaramigo', async(req, res) =>{
    correo_usuario = req.user.correo_usuario;
    correo_amigo = req.body.nuevo_amigo;
    const rows = await pool.query('SELECT * FROM AMIGOS WHERE CORREO_USUARIO = ? AND CORREO_AMIGO = ?', [correo_usuario, correo_amigo]);
    if(rows.length > 0){
        req.flash('message','<center><p style="color:white";>Parece que ya tienes este amigo agregado</p></center>');
        res.redirect('/elegirchat');
    }else if(correo_amigo == correo_usuario){
        req.flash('message','<center><p style="color:white";>No te puedes agregar a ti mismo</p></center>');
        res.redirect('/elegirchat');
    
    }else{
        const id_video = uuidV4();
        newamigo = {
            correo_usuario,
            correo_amigo,
            id_video
        }

        correo_usuario = req.body.nuevo_amigo;
        correo_amigo = req.user.correo_usuario;
        newamigo2 = {
            correo_usuario,
            correo_amigo,
            id_video
        }

        const veri = await pool.query('SELECT * FROM USUARIO WHERE CORREO_USUARIO = ?', [correo_amigo]);
        if(veri.length > 0){
            await pool.query('INSERT INTO AMIGOS SET ?', [newamigo]);
            await pool.query('INSERT INTO AMIGOS SET ?', [newamigo2]);
            req.flash('message','<center><p style="color:white";>Amigo Agregado</p></center>');
            res.redirect('/elegirchat');
        }else{
            req.flash('message','<center><p style="color:white";>Usuario no encontrado</p></center>');
            res.redirect('/elegirchat');
        }

        
    }

});

router.post('/ingresarvideo', async(req, res)=>{
    id_video = req.body.id_chat;
    console.log(id_video);
    res.render('chat/videochat', { room: req.body.id_chat});
});
module.exports = router;
