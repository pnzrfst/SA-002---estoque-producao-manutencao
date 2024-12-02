import {v4 as uuid} from 'uuid'

export default class Insumo_por_veiculo{
    private id : string
    private fk_veiculo: string
    private fk_insumo: string
    private quantidade: number


    constructor(fk_veiculo: string,  fk_insumo: string, quantidade: number, id?: string){
        this.id = id === undefined ? uuid() : id
        this.fk_veiculo = fk_veiculo
        this.fk_insumo = fk_insumo;
        this.quantidade = quantidade
    }

    public getId(){
        return this.id
    }
    
    public getFk_veiculo(){
        return this.fk_veiculo
    }

    public getFk_insumo(){
        return this.fk_insumo
    }

    public getQuantidade(){
        return this.quantidade
    }

}