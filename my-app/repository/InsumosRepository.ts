import { Client } from "pg"

import Insumos from '../entity/Insumos'

export default class InsumosRepository{

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

    async save(insumo: Insumos){
        try {
            this.connection.connect()
            const sql = "INSERT INTO insumo (id, nome_insumo, quantidade, preco_unitario) VALUES ($1, $2, $3, $4)";
            const values = [insumo.getId(), insumo. getNome_insumo(), insumo.getQuantidade(), insumo.getPreco_unitario()];
            await this.connection.query(sql, values);
        } catch (error) {
            console.log(error)
        } finally {
            this.connection.end();
        }
    }

    async verificarInsumoCadastrado(nome: string){
        try{
            console.log(nome)
            this.connection.connect();
            const sql = "SELECT * FROM insumo WHERE nome_insumo = $1"
            const cadastroEncontrado = await this.connection.query(sql, [nome]);
            return cadastroEncontrado.rows[0];

        }catch(error){
            console.log(error);
            return [];

        }finally{
            
            this.connection.end();
        }
    }

    async trazerInsumos(){
        try {
            this.connection.connect();
            const sql = "SELECT * FROM insumo"
            const insumos = await this.connection.query(sql);
            return insumos.rows;
        } catch (error) {
            console.log(error);
            return []
        }finally{
            this.connection.end()
        }
    }


}

