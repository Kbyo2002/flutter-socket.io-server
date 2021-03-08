const { io } = require('../index'); //== ESTO ES NECESARIO PARA PODER
                                    //== SER USADO EN EL ARCHIVO 'index.js'

const Inscritos = require('../models/votos');//== Requerito y autoimportado
//== al declarar 'const inscritos = new Inscritos();'

const Inscrito = require('../models/voto');//== Requerito y autoimportado
//== al declarar 'inscritos.addInscrito(new Inscritos())'

const inscritos = new Inscritos();
var conectados = 0;

inscritos.addInscrito(new Inscrito('Windows'));
inscritos.addInscrito(new Inscrito('MacOS'));
inscritos.addInscrito(new Inscrito('Linux'));
inscritos.addInscrito(new Inscrito('Android'));


//======= Mensajes de Sockets =======
io.on('connection', client => {
    conectados++;
    console.log('Cliente conectado, total de clientes:', conectados);
    
    //= Se lo envieo al cliente que se conecte
    client.emit('sistemas-activos', inscritos.getInscrito());

    
    client.on('disconnect', () => { 
        conectados--;
        console.log('Cliente Desconectado, total de clientes:',conectados)
    });

    //======= TIENE QUE ESTAR DENTRO DEL io.on ('connection')
    client.on('mensaje',( payload )=>{
        //=== DESCOMENTAR EL 'console.lo' y 'io.emit' PARA VER
        //=== LOS EJEMPLOS Y LO QUE SUCEDE EN EL 'localhost:3000'
        //console.log('MENSAJE!!!!!!!!', payload);

        //===== OJOOOOOOOOOOOO =============================
        // client ó io [con client se le manda a un socket 
        //               y con io a todos los que están en 
        //            el mismo canal, es este caso 'mensaje']
        //===================================================
        
        //io.emit('mensaje', {admin: 'Nuevo mensaje'});

    });

    //============== PRUEBA DE CONECTADOS/DESCONECTADOS ======
    /*client.on('dispositivos-activos', (payload)=>{
        io.emit('dispositivos-conectados',conectados);
        
    });*/
    //= Se lo envieo al cliente que se conecte
    client.emit('clientes-activos', conectados);
    //============================================================

    client.on('voto-sistema', (payload)=>{
        //console.log(payload);
        inscritos.voteInscrito(payload.id);
            //= Se lo envieo al cliente que se conecte
        //= OJOOO io es del SERVIDOR todos los clientes conectados
        //= están ahí. Por lo que se lo mandará a todos incluido el
        //= que hizo el voto
        io.emit('sistemas-activos', inscritos.getInscrito());
    });
    
    //== añadir-sistema
    client.on('añadir-sistema', (payload)=>{
        //console.log(payload);
        
        const nuevoInscrito = new Inscrito(payload.nombre);
        inscritos.addInscrito(nuevoInscrito);
            //= Se lo envieo al cliente que se conecte
        //= OJOOO io es del SERVIDOR todos los clientes conectados
        //= están ahí. Por lo que se lo mandará a todos incluido el
        //= que hizo el voto
        io.emit('sistemas-activos', inscritos.getInscrito());
    });

    //=== borrar-sistema
    client.on('borrar-sistema', (payload)=>{
        //console.log(payload);
        inscritos.deleteInscrito(payload.id);
            //= Se lo envieo al cliente que se conecte
        //= OJOOO io es del SERVIDOR todos los clientes conectados
        //= están ahí. Por lo que se lo mandará a todos incluido el
        //= que hizo el voto
        io.emit('sistemas-activos', inscritos.getInscrito());
    });    

    /*client.on('emitir-mensaje',(payload)=>{
        //console.log(payload);//==> Esto solo me sirve para verlo en la consola del servidor
        //io.emit('nuevo-mensaje',payload);//=> DE ESTA MANERA SE LO EMITE A TODOS!!!
        client.broadcast.emit('nuevo-mensaje',payload);//=> DE ESTA MANERA SE LO 
        //=== EMITE A TODOS MENOS A MÍ!!!
    });*/
});