import {v4 as uuid} from 'uuid';

export default class Usuario{
    private id: string;
    private nome: string;
    private cpf: string;
    private email: string;
    private password: string;
    private criado_em: Date;

    constructor(nome: string, cpf: string, email: string, password: string, criado_em: Date, id?: string){
        this.id = id === undefined ? uuid() : id
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.password = password;
        this.criado_em = new Date();
    }


    public getId(){
        return this.id;
    }
    
    public getNome(){
        return this.nome;
    }

    
    public getCpf(){
        return this.cpf;
    }

    
    public getEmail(){
        return this.email;
    }

    
    public getPassword(){
        return this.password;
    }
    
    public getCriadoEm(){
        return this.criado_em;
    }
}
