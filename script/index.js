class Usuario {
    constructor(nome, senha, cpf, email) {
        this.nome = nome;
        this.senha = senha;
        this.cpf = cpf;
        this.email = email
    }
}


function mascaraCPF(campo) {
    let v = campo.value;
    v = v.replace(/\D/g, "");
    v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
    campo.value = v;
}

function salvarUsuario() {


    const nome_cadastro = (document.getElementById("nome_cadastro")).value;
    const senha_cadastro = (document.getElementById("senha_cadastro")).value;
    const cpf_cadastro = (document.getElementById("cpf_cadastro")).value;
    const email_cadastro = (document.getElementById("email_cadastro")).value;

    const usuario = new Usuario(nome_cadastro, senha_cadastro, cpf_cadastro, email_cadastro)
    console.log(usuario)

    document.getElementById("nome_cadastro").value = "";
    document.getElementById("senha_cadastro").value = "";
    document.getElementById("cpf_cadastro").value = "";
    document.getElementById("email_cadastro").value = "";

   vaiParaLogin();

}

function vaiParaCadastro(){
    window.location.replace("http://127.0.0.1:5500/html/cadastro.html");
}
function vaiParaLogin(){
    window.location.replace("http://127.0.0.1:5500/html/login.html");
}

function toggleMenu() {
    var menu = document.getElementById("menu");
    menu.classList.toggle("active"); 
  }