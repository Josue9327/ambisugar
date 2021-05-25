const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const passport = require('passport');
const session = require('express-session');
const mysqlstore = require('express-mysql-session');
const fileUpload = require('express-fileupload');


const { database } = require('./keys');

require('./lib/passport');
//configuraciones
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}))
app.set('view engine', '.hbs');
//middleware
app.use(session({
    secret: 'maitude',
    resave: false,
    saveUninitialized: false,
    store: new mysqlstore(database)
}));
app.use(fileUpload());
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());


//variables globales
app.use((req, res, next) => {
    app.locals.success = req.flash('succes');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
});

//rutas
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use(require('./routes/maitude'));
app.use(require('./routes/actividades'));
app.use(require('./routes/pdf'));
app.use(require('./routes/chat'));
app.use(require('./routes/administrador'));
app.use('/maitude', require('./routes/maitude'));






//public
app.use(express.static(path.join(__dirname, 'public')));
//start
http.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});
//manejo de erorres
app.use(function(req, res, next){ res.status(404).render('errores/404', {title: "Sorry, page not found"}); });

var usuarios = [];

//chat
io.on('connection', function(socket) {
    socket.on('storeClientInfo', function (data) {
      socketInfo = {
        socketId       : socket.id,
        socketcorreo : data.to.micorreo
      };
    usuarios.push(socketInfo);
     });
      
      socket.on('chat:message', (data) =>{
        for (let i = 0; i < usuarios.length; i++) {
          if(usuarios[i].socketcorreo == data.sucorreo){
            io.to(usuarios[i].socketId).emit('chat:message', data);
          }

  
        }
      });
       
      /*
       * Imprimimos en consola cada vez que un usuario
       * se desconecte del sistema.
       */
      socket.on('disconnect', function(data) {
        for (let i = 0; i < usuarios.length; i++) {
          if(usuarios[i].socketId == socket.id){
            usuarios.splice(i,i);
            
          }
          
        }
      });
      socket.on('join-room', (roomId, userId) => {
        socket.join(roomId)  // Join the room
        socket.broadcast.to(roomId).emit('user-connected', userId) // Tell everyone else in the room that we joined
        
        // Communicate the disconnection
        socket.on('disconnect', () => {
            socket.broadcast.emit('user-disconnected', userId)
        })
    })
  
    });