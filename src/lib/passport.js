const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('../lib/helpers');
const rsa = require('node-rsa');

passport.use('local.login', new localStrategy ({
  usernameField: 'correo_usuario',
  passwordField: 'contraseña_usuario',
  passReqToCallback: true
}, async(req, username, password, done) => {
    var expc = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/;
    var expp = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
    if(expc.test(username) && expp.test(password)){
    let consulta = 'CALL Consultar_usuario_correo(?)';
    const [[rows]] = await pool.query(consulta, [username]);
    if (rows){
      const user = rows;
      const validPassword = await helpers.matchPasword(password, user.contraseña_usuario);
      if (validPassword){
          if(user.nivel == 1){
            user.admin = true;
          }else{
            user.admin = false;
          }
          done(null, user, req.flash('success','Welcome' + user.nombre_usuario));
      } else{
        done(null, false, req.flash('message','<center><p style="color:white";>Contraseña incorrecta</p></center>'));
      }
    } else{
      return done(null, false, req.flash('message','<center><p style="color:white";>El usuario no existe</p></center>'));
    }
  }else{
    return done(null, false, req.flash('message','<center><p style="color:white";>Los datos son invalidos</p></center>'));
  }
  }));


passport.use('local.registro', new localStrategy({
    usernameField: 'correo_usuario',
    passwordField: 'contraseña_usuario',
    passReqToCallback: true
}, async (req, username, password, done) => {
  let consulta = 'CALL Consultar_usuario_correo(?)';
  const [[rows]] = await pool.query(consulta, [username]);
  var expc = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/;
  var expp = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
  if(expc.test(username) && expp.test(password)){
  if(rows){
    done(null, false, req.flash('message','<center><p style="color:white";>Usuario en uso</p></center>'));
  }else{

   const { nombre_usuario } = req.body;
   const { apellidos_usuario } = req.body;
   const { fecha_usuario } = req.body;
  const key = new rsa({b:512});
 key.setOptions({encryptionScheme: 'pkcs1'});
 var publicKey = key.exportKey('pkcs8-public-pem');
 var privateKey = key.exportKey('pkcs8-private-pem');
   let newuser = {    
    nombre_usuario,
    apellidos_usuario,
    fecha_usuario,
    contraseña_usuario: password,
    correo_usuario: username,
    publika: publicKey,
    privaka: privateKey,
   };
   let compimg = req.files;
   if(compimg != null){
     let image = req.files.imagen;
     newuser.foto = newuser.correo_usuario+'.jpg'; 
     image.mv(`./src/public/img_us/${newuser.correo_usuario}.jpg`,err => {
       if(err)
       console.log(err); 
   })
   
    
   
  }else{
    newuser.foto = 'default.jpg'; 
  }
   newuser.nivel = 0;
   newuser.contraseña_usuario = await helpers.encrypyPassword(password);
   let consulta = 'CALL Almacenar_usuario(?)'
   const [[result]] = await pool.query(consulta, [Object.values(newuser)]);
   newuser.id_usuario = result.id_insert;
   return done(null, newuser);
  }}else{
    done(null, false, req.flash('message','<center><p style="color:white";>Datos invalidos</p></center>'));
  }
  

}));

passport.serializeUser((user, done) => {
    done(null, user.id_usuario);
  });
  
  passport.deserializeUser(async (id, done) => {
    let consulta = 'CALL Consultar_usuario_id(?)'
    let [[rows]] = await pool.query(consulta, [id]);
    if(rows != null){
    if(rows.nivel == 1){
      rows.admin = true;
    }else{
      rows.admin = false;
    }
  }else{
    rows = null;
  }
    done(null, rows);
  });
  