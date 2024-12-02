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
                "password": "Lzpd0304"
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

    async trazerInsumoPorId(id: string){
        try {
            this.connection.connect();
            const sql = "SELECT * FROM insumo WHERE id = $1"
            const insumos = await this.connection.query(sql, [id]);
            return insumos.rows[0];
        } catch (error) {
            console.log(error);
            return []
        }finally{
            this.connection.end()
        }
    }

    async trazerInsumoPorNome(nome: string){
        try {
            this.connection.connect();
            const sql = "SELECT * FROM insumo WHERE nome_insumo = $1"
            const insumos = await this.connection.query(sql, [nome]);
            return insumos.rows[0];
        } catch (error) {
            console.log(error);
            return []
        }finally{
            this.connection.end()
        }
    }

    async descontarInsumo(id: string, quantidade: number){
        try {
            this.connection.connect();
            const sql = "UPDATE insumo SET quantidade = quantidade - $1 WHERE id = $2"
            const insumos = await this.connection.query(sql, [quantidade, id]);
            return insumos.rows[0];
        } catch (error) {
            console.log(error);
            return []
        }finally{
            this.connection.end()
        }
    }

    async atualizarInsumo(nome_insumo: string, quantidade: number, preco_unitario: number, id: string){
        try {
            this.connection.connect();
            const sql = "UPDATE insumo SET nome_insumo = $1, quantidade = $2, preco_unitario = $3 WHERE id = $4"
            const insumos = await this.connection.query(sql, [nome_insumo, quantidade, preco_unitario, id]);
            return insumos.rows[0];
        } catch (error) {
            console.log(error);
            return []
        }finally{
            this.connection.end()
        }
    }


    async apagarInsumo(id: string){
        try {
            this.connection.connect();
            const sql = "DELETE FROM insumo WHERE id = $1"
            const insumos = await this.connection.query(sql, [id]);
            return insumos.rows[0];
        } catch (error) {
            console.log(error);
            return []
        }finally{
            this.connection.end()
        }
    }

}

