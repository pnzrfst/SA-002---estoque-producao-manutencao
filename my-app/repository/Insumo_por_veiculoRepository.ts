import { Client } from "pg"

import Insumo_por_veiculo from '../entity/Insumo_por_veiculo'

export default class Insumo_por_veiculoRepository{

    private connection : Client

    constructor(){
        if(!this.connection){
            this.connection = new Client({
                "host" : "localhost",
                "port": 5432,
                "database": "industria-teste",
                "user": "postgres",
                "password": "Lzpd0304"
            })
        }
    }

    async save(associarInsumoVeiculo: Insumo_por_veiculo){
        try {
            this.connection.connect()
            const sql = "INSERT INTO insumo_por_veiculo(id, fk_veiculo, fk_insumo, quantidade_usada) VALUES ($1, $2, $3, $4)";
            const values = [associarInsumoVeiculo.getId(), associarInsumoVeiculo.getFk_veiculo(), associarInsumoVeiculo.getFk_insumo(), associarInsumoVeiculo.getQuantidade()];
            await this.connection.query(sql, values);
        } catch (error) {
            console.log(error)
        } finally {
            this.connection.end();
        }
    }
}