import { Client } from "pg"

import Usuario from '../entity/Usuario'

export default class UsuarioRepository{

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

    async save(usuario: Usuario){
        try {
            this.connection.connect()
            const sql = "INSERT INTO usuario (id, nome, cpf, email, password_hash, criado_em) VALUES ($1, $2, $3, $4, $5, $6)";
            const values = [usuario.getId(), usuario.getNome(), usuario.getCpf(), usuario.getEmail(), usuario.getPassword(), usuario.getCriadoEm()];
            await this.connection.query(sql, values);
        } catch (error) {
            console.log(error)
        } finally {
            this.connection.end();
        }
    }

    async verificarCadastroExistente(email: string){
        try{
            console.log(email)
            this.connection.connect();
            const sql = "SELECT * FROM usuario WHERE email = $1"
            const cadastroEncontrado = await this.connection.query(sql, [email]);
            return cadastroEncontrado.rows[0];

        }catch(error){
            console.log(error);
            return [];

        }finally{
            
            this.connection.end();
        }
    }


    async acharConta(email: string){
        try {
            console.log(email);
            this.connection.connect();
            const sql = "SELECT * FROM usuario WHERE email = $1"
            const contaEncontrada = await this.connection.query(sql, [email]);
            return contaEncontrada.rows[0];
        } catch (error) {
            console.log(error);
            return []
        }finally{
            this.connection.end()
        }
    }


}

