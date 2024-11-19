import {v4 as uuid} from 'uuid'

export default class Insumos{
    private id : string
    private nome_insumo: string
    private quantidade: number
    private preco_unitario: number


    constructor(nome_insumo: string, quantidade: number, preco_unitario: number, id?: string){
        this.id = id === undefined ? uuid() : id
        this.nome_insumo = nome_insumo;
        this.quantidade = quantidade;
        this.preco_unitario = preco_unitario
    }

    public getId(){
        return this.id
    }
    
    public getNome_insumo(){
        return this.nome_insumo
    }

    public getQuantidade(){
        return this.quantidade
    }

    public getPreco_unitario(){
        return this.preco_unitario
    }

}