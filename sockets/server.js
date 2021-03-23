const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

server.listen(3001);
 
app.use(express.static('public'));

const socketIo = require('socket.io');
const io = socketIo.listen(server);

UserOnId = new Array();
IdsOnUser = new Array();

io.on('connect', function(socket){
    console.log('nueva conexión id: ' + socket.id);

    socket.on('datos_usuario', function(datos){   
        id_user = socket.id;
        
        UserOnId[id_user] = datos.usuario;
        if(IdsOnUser[datos.usuario] == null){
            IdsOnUser[datos.usuario] = new Array();
        }
        IdsOnUser[datos.usuario].push(id_user);
        
        console.log('------------------- usuarios por id ------------------');
        console.log(UserOnId);
        console.log('------------------- ids por usuario ------------------');
        console.log(IdsOnUser);
        console.log('----------- Cantidad de usuarios en linea ------------');
        console.log(Object.keys(IdsOnUser).length);

        console.log('correo: ' + datos.correo + ' - Usuario: ' + datos.usuario + ' - Id Socket: ' + id_user);
        io.emit('nuevo_usuario', {user: datos.usuario, id_user: id_user} );
    });
    
    socket.on('send_message', function(datos){   
        let id_usuario;
        console.log(datos.usuario + ' esta enviando un mensaje...');
        io.to(id_usuario).emit('nuevo_mensaje', {user: datos.usuario, mensaje: datos.mensaje} );
    });

    socket.on('disconnect', function(){
        id_user = socket.id;
        usuario = UserOnId[id_user];
    });

});