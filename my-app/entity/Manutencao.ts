import {v4 as uuid} from 'uuid'

export default class Manutencao{
    private id : string
    private descricao: string
    private data_manutencao: Date
    private valor: number
    private fk_veiculo: string

    constructor(descricao: string, valor: number, fk_veiculo: string, id?: string){
        this.id = id === undefined ? uuid() : id
        this.descricao = descricao;
        this.data_manutencao = new Date()
        this.valor = valor;
        this.fk_veiculo = fk_veiculo;
    }


    public getId(){
        return this.id;
    }

    public getDescricao(){
        return this.descricao;
    }

    public getDataManutencao(){
        return this.data_manutencao;
    }

    public getValor(){
        return this.valor;
    }


    public getFK(){
        return this.fk_veiculo;
    }

}