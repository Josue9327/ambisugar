const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/edit_usuarios', async(req, res)=>{
    res.render('administrador/editar_usuarios');
});

router.post('/buscar_usuario', async(req, res)=>{
    const { u_buscado } = req.body;
    let consulta = 'CALL Consultar_usuario_correo(?)';
    const [[rows]] = await pool.query(consulta, [u_buscado]);
    if(rows){
        res.render('administrador/editar_usuarios', {rows});
    }else{
        req.flash('message','<center><p style="color:white";>No hemos encontrado ningun usuario con ese correo</p></center>')
        res.redirect('edit_usuarios');
    }
    
});

router.post('/borrar_usuario', async(req, res)=>{
const { correo_usuario } = req.body;
const { id_usuario } = req.body;
const { u_buscado } = req.body;
if(correo_usuario == u_buscado){
    let consulta = 'CALL Eliminar_usuario(?)';
    await pool.query(consulta, [id_usuario]);
    req.flash('message', '<center><p style="color:white";>Usuario borrado con exito</p></center>')
    res.redirect('edit_usuarios');
}else{
    req.flash('message', '<center><p style="color:white";>El correo no coincide</p></center>')
    res.redirect('edit_usuarios');
}
});

router.post('/editar_usuarios', async(req, res)=>{
    const { id_usuario } = req.body;
    const { nombre_usuario } = req.body;
    const { apellidos_usuario } = req.body;
    const { fecha_usuario } = req.body;

    const user_edit = {
        id_usuario,
        nombre_usuario,
        apellidos_usuario,
        fecha_usuario,
    }
    res.render('administrador/editar_datos', {user_edit});
});

router.post('/borrar_pagina_m', async(req, res) =>{
    const { id_usuario } = req.body;
    console.log(id_usuario);
    const materia = {
        id_usuario,
        materia: 2
    }
    let consulta = 'CALL consultar_actividad(?)';
    const [rows] = await pool.query(consulta, [Object.values(materia)]);
    rows.nusuario = id_usuario;
    res.render('administrador/materias_m.hbs', {rows});
});
router.post('/borrar_pagina_f', async(req, res) =>{
    const { id_usuario } = req.body;
    const obj = {
        id_usuario,
        materia: 1
    }
    let consulta = 'CALL consultar_actividad(?)';
    const [rows] = await pool.query(consulta, [Object.values(obj)]);
    rows.nusuario = id_usuario;
    res.render('administrador/materias_f.hbs', {rows});
});
router.post('/borrar_pagina_q', async(req, res) =>{
    const { id_usuario } = req.body;
    const obj = {
        id_usuario,
        materia: 0
    }
    let consulta = 'CALL consultar_actividad(?)';
    const [rows] = await pool.query(consulta, [Object.values(obj)]);
    rows.nusuario = id_usuario;
    res.render('administrador/materias_q.hbs', {rows});
});






router.post('/borrar_m', async(req, res) =>{
    const { id_usuario } = req.body;
    let b_actividad = {
        id_usuario,
        materia: 2
    }
    let consulta = 'CALL borrar_act(?)';
    await pool.query(consulta, [Object.values(b_actividad)]);
    req.flash('message', '<center><p style="color:white";>Materia borrada con exito</p></center>')
    res.redirect('edit_usuarios');
});

router.post('/borrar_f', async(req, res) =>{
    const { id_usuario } = req.body;
    let b_actividad = {
        id_usuario,
        materia: 1
    }
    let consulta = 'CALL borrar_act(?)';
    await pool.query(consulta, [Object.values(b_actividad)]);
    req.flash('message', '<center><p style="color:white";>Materia borrada con exito</p></center>')
    res.redirect('edit_usuarios');
});

router.post('/borrar_q', async(req, res) =>{
    const { id_usuario } = req.body;
    let b_actividad = {
        id_usuario,
        materia: 0
    }
    let consulta = 'CALL borrar_act(?)';
    await pool.query(consulta, [Object.values(b_actividad)]);
    req.flash('message', '<center><p style="color:white";>Materia borrada con exito</p></center>')
    res.redirect('edit_usuarios');
});

router.post('/editar_usuario_admin', async(req, res) =>{
    const { id_usuario } = req.body;
    const { nombre_usuario } = req.body;
    const { apellidos_usuario } = req.body;
    const { fecha_usuario } = req.body;

    const user_edit = {
        id_usuario,
        nombre_usuario,
        apellidos_usuario,
        fecha_usuario,
    }
    let consulta = 'CALL editar_datos(?)';
    await pool.query(consulta, [Object.values(user_edit)]);
    req.flash('message', '<center><p style="color:white";>Usuario modificado con exito</p></center>')
    res.redirect('edit_usuarios');

});

module.exports = router;