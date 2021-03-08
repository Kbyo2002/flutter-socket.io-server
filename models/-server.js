//==== Servidor de Express
const express = require('express');

//===== Node Server ===============
const http = require('http');

const socketio = require('socket.io');

const path = require('path');
const Sockets = require('./sockets');



//require('../sockets/sockets');//==> HAGO LA LLAMADA A ESTE ARCHIVO
                              //==  PARA PODER USAR SU CONTENIDO




class Server{

    constructor(){

        //===== App de Express =========
        this.app = express();
        this.port = 3000;


        // http server
        this.server = http.createServer(this.app);


        // Configuraciones de sockets
        this.io = socketio(this.server, {/*  configuraciones  */});//==> Exporto el .io
                                //== para que se pueda usar fuera de este archivo,
                                //== en este caso en './sockets/sockets.js'
    }

    middlewares(){
        //==== Path público
        const publicPath = path.resolve(__dirname,'../public');
        this.app.use(express.static(publicPath));

    }

    configurarSockets(){
        new Sockets(this.io);
    }

    execute(){
        //== Inicializar Middelwares
        this.middlewares();

        //== Inicializar Server
        this.server.listen(this.port,()=>{
            console.log('Servidor corriendo en puerto:', this.port);
        });
        /*this.server.listen(this.process.env.PORT, (err) =>{

            if (err) throw new Error(err);
        
            console.log('Servidorr corriendo en puerto', process.env.PORT);
        });*/
    }
}

//==== Exportación para poderlo usar en otros sitios
module.exports = Server; //==> Lo de arriba en verde
