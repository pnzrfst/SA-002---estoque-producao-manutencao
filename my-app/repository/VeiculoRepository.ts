import { Client } from "pg"

import Veiculo from '../entity/Veiculo'

export default class VeiculoRepository{

    private connection : Client

    constructor(){
        if(!this.connection){
            this.connection = new Client({
                "host" : "localhost",
                "port": 5432,
                "database": "industria-teste",
                "user": "postgres",
                "password": "senai"
            })
        }
    }

    async save(veiculo: Veiculo){
        try {
            this.connection.connect()
            const sql = "INSERT INTO veiculo (id, chassi, modelo, cor, inicio_producao, fim_producao) VALUES ($1, $2, $3, $4, $5, $6)";
            const values = [veiculo.getId(), veiculo.getChassi(), veiculo.getModelo(), veiculo.getCor(), veiculo.getInicioProducao(), veiculo.getFimProducao()];
            await this.connection.query(sql, values);
        } catch (error) {
            console.log(error)
        } finally {
            this.connection.end();
        }
    }




}