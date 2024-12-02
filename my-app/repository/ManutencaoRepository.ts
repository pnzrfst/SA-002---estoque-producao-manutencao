import Manutencao from "../entity/Manutencao";
import { Client } from "pg"

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

    async save(manutencao: Manutencao){
        try {
            this.connection.connect()
            const sql = "INSERT INTO manutencao (id, descricao, data_manutencao, valor, fk_veiculo) VALUES ($1, $2, $3, $4, $5)";
            const values = [manutencao.getId(), manutencao.getDescricao(), manutencao.getDataManutencao(), manutencao.getValor(), manutencao.getFK()];
            const manutencaoCadastrada = await this.connection.query(sql, values);
            return manutencaoCadastrada.rows[0]
        } catch (error) {
            console.log(error)
        } finally {
            this.connection.end();
        }
    }
}