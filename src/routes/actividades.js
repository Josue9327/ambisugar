const express = require('express');
const router = express.Router();
const pool = require('../database');
var fecha_de_hoy = new Date();
const dia = fecha_de_hoy.getDate();
const mes = fecha_de_hoy.getMonth()+1;
const año = fecha_de_hoy.getFullYear();

fecha = dia+'/'+mes+'/'+año;
router.post('/enviar_resultado1', async(req, res)=>{
    const id_usuario = req.user.id_usuario;
    const actividad = req.body.act1;
    const materia = req.body.materia;
   
    const verificar = await pool.query('SELECT * FROM ACTIVIDADES WHERE ID_USUARIO = ? AND ACTIVIDAD = ? AND MATERIA = ?', [id_usuario, actividad, materia]);
    
    if(verificar.length > 0){

        res.render('maitude/calificar', {newresp: verificar[0]});
    }
    else{
    var p1= req.body.p1;
    var p2= req.body.p2;
    var p3= req.body.p3;
    var p4= req.body.p4;
    var resp = 0;
    if(p1 == '0')
    resp++;

    if(p2 == '1')
    resp++;
    
    if(p3 == '2')
    resp++;

    if(p4 == '3')
    resp++;

    var newresp = {
        materia,
        id_usuario: req.user.id_usuario,
        puntaje: resp,
        estado: 1,
        actividad: req.body.act1,
        fecha
    };

   const guardar = await pool.query('INSERT INTO ACTIVIDADES SET ?', [newresp]);

   res.render('maitude/calificar', {newresp});
        
    }

});




router.post('/enviar_resultado2', async(req, res)=>{
    const id_usuario = req.user.id_usuario;
    const actividad = req.body.act2;
    const materia = req.body.materia;
    const verificar = await pool.query('SELECT * FROM ACTIVIDADES WHERE ID_USUARIO = ? AND ACTIVIDAD = ? AND MATERIA = ?', [id_usuario, actividad, materia]);
    if(verificar.length > 0){

        res.render('maitude/calificar', {newresp: verificar[0]});
    }
    else{
    var p1= req.body.p1;
    var p2= req.body.p2;
    var p3= req.body.p3;
    var p4= req.body.p4;
    var resp = 0;
    if(p1 == '3')
    resp++;

    if(p2 == '0')
    resp++;
    
    if(p3 == '2')
    resp++;

    if(p4 == '1')
    resp++;
  
    var newresp = {
        materia,
        id_usuario: req.user.id_usuario,
        puntaje: resp,
        estado: 1,
        actividad: req.body.act2,
        fecha
    };

   const guardar = await pool.query('INSERT INTO ACTIVIDADES SET ?', [newresp]);

   res.render('maitude/calificar', {newresp});
        
    }

});

router.post('/enviar_resultado3', async(req, res)=>{
    const id_usuario = req.user.id_usuario;
    const actividad = req.body.act3;
    const materia = req.body.materia;
    const verificar = await pool.query('SELECT * FROM ACTIVIDADES WHERE ID_USUARIO = ? AND ACTIVIDAD = ? AND MATERIA = ?', [id_usuario, actividad, materia]);
    if(verificar.length > 0){

        res.render('maitude/calificar', {newresp: verificar[0]});
    }
    else{
    var p1= req.body.p1;
    var p2= req.body.p2;
    var p3= req.body.p3;
    var p4= req.body.p4;
    var resp = 0;
    if(p1 == '2')
    resp++;

    if(p2 == '1')
    resp++;
    
    if(p3 == '0')
    resp++;

    if(p4 == '3')
    resp++;
  
    var newresp = {
        materia,
        id_usuario: req.user.id_usuario,
        puntaje: resp,
        estado: 1,
        actividad: req.body.act3,
        fecha
    };

   const guardar = await pool.query('INSERT INTO ACTIVIDADES SET ?', [newresp]);

   res.render('maitude/calificar', {newresp});
        
    }

});


router.post('/enviar_resultado4', async(req, res)=>{
    const id_usuario = req.user.id_usuario;
    const actividad = req.body.act4;
    const materia = req.body.materia;
    const verificar = await pool.query('SELECT * FROM ACTIVIDADES WHERE ID_USUARIO = ? AND ACTIVIDAD = ? AND MATERIA = ?', [id_usuario, actividad, materia]);
    if(verificar.length > 0){

        res.render('maitude/calificar', {newresp: verificar[0]});
    }
    else{
    var p1= req.body.p1;
    var p2= req.body.p2;
    var p3= req.body.p3;
    var p4= req.body.p4;
    var resp = 0;
    if(p1 == '3')
    resp++;

    if(p2 == '2')
    resp++;
    
    if(p3 == '1')
    resp++;

    if(p4 == '0')
    resp++;
  
    var newresp = {
        materia,
        id_usuario: req.user.id_usuario,
        puntaje: resp,
        estado: 1,
        actividad: req.body.act4,
        fecha
    };

   const guardar = await pool.query('INSERT INTO ACTIVIDADES SET ?', [newresp]);

   res.render('maitude/calificar', {newresp});
        
    }

});


router.post('/enviar_resultado5', async(req, res)=>{
    const id_usuario = req.user.id_usuario;
    const actividad = req.body.act5;
    const materia = req.body.materia;
    const verificar = await pool.query('SELECT * FROM ACTIVIDADES WHERE ID_USUARIO = ? AND ACTIVIDAD = ? AND MATERIA = ?', [id_usuario, actividad, materia]);
    if(verificar.length > 0){

        res.render('maitude/calificar', {newresp: verificar[0]});
    }
    else{
    var p1= req.body.p1;
    var p2= req.body.p2;
    var p3= req.body.p3;
    var p4= req.body.p4;
    var resp = 0;
    if(p1 == '2')
    resp++;

    if(p2 == '0')
    resp++;
    
    if(p3 == '3')
    resp++;

    if(p4 == '1')
    resp++;
  
    var newresp = {
        materia,
        id_usuario: req.user.id_usuario,
        puntaje: resp,
        estado: 1,
        actividad: req.body.act5,
        fecha
    };

   const guardar = await pool.query('INSERT INTO ACTIVIDADES SET ?', [newresp]);

   res.render('maitude/calificar', {newresp});
        
    }

});



router.get('/resultados/:materia', async(req, res) => {
    materia = req.params.materia;
    const obj = {};
    const rows = await pool.query('SELECT * FROM ACTIVIDADES WHERE ID_USUARIO = ? AND MATERIA = ?', [req.user.id_usuario, materia]);
    for (let i = 0; i < rows.length; i++) {
        obj[i] = rows[i];        
    }
    res.render('maitude/resultados', {obj});
});

module.exports = router;