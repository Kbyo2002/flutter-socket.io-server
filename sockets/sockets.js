const { Socket } = require('socket.io');
const { io } = require('../index'); //== ESTO ES NECESARIO PARA PODER


//===== Mensajes de Sockets =======
io.on('connection', client => {
    console.log('Cliente conectado, su id es:', client.id);
    //console.log( client.id)//=> ASI CONSIGO UN 'ID' ÚNICO DEL CLIENTE
    

    //====== AÑADIDO PARA EL CHAT =============================
    //---------------------------------------------------------
    io.emit('mensaje',{
        //== Se puede mandar cualquier cantidad de elementeos en el mensaje
        mensaje: 'Bienvenido al server',//== Texto
        fecha: new Date(),//== Fecha y hora del SERVIDOR
    });

    //===== Escuchar el Evento =====
    client.on('mensaje', (data)=>{
        console.log(data);
    });
    
    //=========================================================

    client.on('disconnect', () => { 
        console.log('Cliente Desconectado')
    });

    //======= TIENE QUE ESTAR DENTRO DEL io.on ('connection')
    client.on('mensaje',( payload )=>{
        
        console.log('MENSAJE!!!!!!!!', payload);

        //===== OJOOOOOOOOOOOO =============================
        // client ó io [con client se le manda a un socket 
        //               y con io a todos los que están en 
        //            el mismo canal, es este caso 'mensaje']
        //===================================================
        io.emit('mensaje', {admin: 'Nuevo mensaje'});

    });


});