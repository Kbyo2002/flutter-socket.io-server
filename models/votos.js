//const Inscrito = require("./inscrito");

//== OJO CON MAYÚSCULAS Y MINÚSCULAS INICIALES, ASÍ COMO SINGUGLAR
//== Y PLURAL

class Inscritos {

    constructor(){
        this.inscritos = [];
    }

addInscrito( inscrito = new Inscrito()){
    this.inscritos.push(inscrito);
}

getInscrito(){
    return this.inscritos;
}

deleteInscrito(id=''){
    this.inscritos= this.inscritos.filter(inscrito=> inscrito.id !== id);
    return this.inscritos;
}

voteInscrito(id=''){
    this.inscritos = this.inscritos.map(inscrito=>{
        if (inscrito.id===id){
            inscrito.votos++;
            return inscrito;
        }else{
            return inscrito;
        }
    })
}

}

module.exports = Inscritos;