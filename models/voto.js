const { v4: uuidV4} = require ('uuid');

class Insccrito{

    constructor (nombre = 'no-name'){
        this.id = uuidV4();// IDENTIFICADOR ÚNICO
        this.nombre = nombre;
        this.votos = 0;
    }
}

module.exports = Insccrito;