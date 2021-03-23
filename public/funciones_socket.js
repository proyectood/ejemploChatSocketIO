const socket = io.connect();

var yo = '';
// var id_user = '';

function logear(){
    let correo = document.getElementById('correo').value;
    let usuario = $('#login_form #usuario').val();
    socket.emit('datos_usuario', { correo: correo, usuario: usuario } );
    yo = usuario;
    // id_user = socket.id;
    document.getElementById('usuarioLogeado').innerText = yo;
}

socket.on('nuevo_usuario', function(datos){  
    alert('Nuevo usuario conectado: ' + datos.user);
});

function enviar_mensaje(){
    if(yo.trim() != ''){
        let mensajeTxt = $('#mensaje').val();
        socket.emit('send_message', { mensaje: mensajeTxt , usuario: yo} );
    }else{
        alert('Se debe logear para manda msj');
    }
}

socket.on('nuevo_mensaje', function(datos){  
    $('#conte_mensajes').append('<p style="font-size: 14px;"><b>'+datos.user+': </b>'+datos.mensaje+'</p>');
});