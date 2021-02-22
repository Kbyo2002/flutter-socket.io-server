const { io } = require('../index'); //== ESTO ES NECESARIO PARA PODER
                                //== SER USADO EN EL ARCHIVO 'index.js'
//===== Mensajes de Sockets =======
io.on('connection', client => {
    console.log('Cliente conectado');
    
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