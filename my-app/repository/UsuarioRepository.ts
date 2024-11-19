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
                "password": "senai"
            })
        }
    }

    async save(usuario: Usuario){
        try {
            this.connection.connect()
            const sql = "INSERT INTO veiculo (id, nome, cpf, email,  password, criado_em) VALUES ($1, $2, $3, $4, $5, $6)";
            const values = [usuario.getId(), usuario.getNome(), usuario.getCpf(), usuario.getEmail(), usuario.getPassword(), usuario.getCriadoEm()];
            await this.connection.query(sql, values);
        } catch (error) {
            console.log(error)
        } finally {
            this.connection.end();
        }
    }




}