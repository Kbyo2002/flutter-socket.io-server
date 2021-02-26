//const { Socket } = require('dgram');
const express = require('express');
const path = require('path');
require('dotenv').config();


//===== App de Express =============
const app = express();

//===== Node Server ===============
const server = require('http').createServer(app);

module.exports.io = require('socket.io')(server);//==> Exporto el .io
                    //== para que se pueda usar fuera de este archivo,
                    //== en este caso en './sockets/sockets.js'
require('./sockets/sockets');//==> HAGO LA LLAMADA A ESTE ARCHIVO
                             //==  PARA PODER USAR SU CONTENIDO


//==== Path público
const publicPath = path.resolve(__dirname,'public');
app.use(express.static(publicPath));

//===== NUEVO DEL CHAT ========
//_________________________
/*io.on('connection', (socket) => {
    socket.on('mensaje',(data)=>{
        console.log(data);
    })
})
//========================*/


server.listen(process.env.PORT, (err) =>{

    if (err) throw new Error(err);

    console.log('Servidorr corriendo en puerto', process.env.PORT);
})