import {v4 as uuid} from 'uuid'


export default class Veiculo{
    private id : string 
    private chassi: string
    private modelo: string
    private cor: string
    private inicioProducao: Date
    private fimProducao: Date


    constructor(chassi: string, modelo: string, cor: string, id?: string){
        this.id = id === undefined ? uuid() : id
        this.chassi = chassi;
        this.modelo = modelo;
        this.cor = cor;
        this.inicioProducao = new Date();
        this.fimProducao = new Date(this.inicioProducao.getTime() + 60000)
    }


    public getId(){
        return this.id;
    }
    
    public getChassi(){
        return this.chassi;
    }

    public getModelo(){
        return this.modelo;
    }

    public getCor(){
        return this.cor;
    }

    public getInicioProducao(){
        return this.inicioProducao;
    }

    public getFimProducao(){
        return this.fimProducao;
    }

}