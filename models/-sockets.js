
class Sockets {


    constructor(io){
        this.io = io;
        this.socketsEvents();
    }

    socketsEvents(){
        //===== Mensajes de Sockets =======
        this.io.on('connection', client => {
            console.log('Cliente conectado, su id es:', client.id);
            //console.log( client.id)//=> ASI CONSIGO UN 'ID' ÚNICO DEL CLIENTE
    

          //====== AÑADIDO PARA EL CHAT =============================
                //---------------------------------------------------------
            /*io.emit('mensaje',{
            //== Se puede mandar cualquier cantidad de elementeos en el mensaje
            mensaje: 'Bienvenido al server',//== Texto
            fecha: new Date(),//== Fecha y hora del SERVIDOR
            });*/

            //===== Escuchar el Evento =====
            client.on('mensaje-al-servidor', (data)=>{
                console.log(data);
        
              //==== OJOOOO!!!! SI DEJO 'socket' ó 'client no lo recivirá todo el 
                //mundo del chat
                //client.emit('mensaje-del-servidor',data);

              //=== SI PONGO 'io' SÍ LO RECIVIRÁN TODOS LOS QUE ESTÉN CONECTADOS
             //=== SE EMITO POR LO TANTO UN MENSAJE GLOBAL A TODOS LOS CONECTADOS
             this.io.emit('mensaje-del-servidor',data);
            });
            //_________________________________________________________
            //=========================================================
        });

    }

}


//=== LO EXPORTO PARA ASÍ PODER USARLO
module.exports = Sockets;