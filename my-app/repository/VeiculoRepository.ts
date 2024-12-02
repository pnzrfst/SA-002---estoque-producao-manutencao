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
                "password": "Lzpd0304"
            })
        }
    }

    async save(veiculo: Veiculo){
        try {
            this.connection.connect()
            const sql = "INSERT INTO veiculo (id, chassi, modelo, cor, inicio_producao, fim_producao) VALUES ($1, $2, $3, $4, $5, $6)  RETURNING id, chassi, modelo, cor, inicio_producao, fim_producao;";
            const values = [veiculo.getId(), veiculo.getChassi(), veiculo.getModelo(), veiculo.getCor(), veiculo.getInicioProducao(), veiculo.getFimProducao()];
            const veiculoCadastrado = await this.connection.query(sql, values);
            return veiculoCadastrado.rows[0]
        } catch (error) {
            console.log(error)
        } finally {
            this.connection.end();
        }
    }

    
    async trazerVeiculos(){
        try {
            this.connection.connect();
            const sql = "SELECT * FROM veiculo LIMIT 10"
            const veiculos = await this.connection.query(sql);
            return veiculos.rows;
        } catch (error) {
            console.log(error);
            return []
        }finally{
            this.connection.end()
        }
    }

    async trazerVeiculoPorId(id: string){
        try {
            this.connection.connect();
            const sql = "SELECT * FROM veiculo WHERE id = $1"
            const veiculo = await this.connection.query(sql, [id]);
            return veiculo.rows[0];
        } catch (error) {
            console.log(error);
            return []
        }finally{
            this.connection.end()
        }
    }
}