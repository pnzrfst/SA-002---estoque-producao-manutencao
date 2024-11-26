import "../../index.css"

document.getElementById("return-login").addEventListener("click", () =>{
    (window as any).navigationApi.voltarLogin()
})

document.getElementById("cadastrar-user").addEventListener("click", async(event: MouseEvent) => {
    event.preventDefault()

    const nome_cadastro = document.getElementById('nome_cadastro') as HTMLInputElement;
    const cpf_cadastro = document.getElementById('cpf_cadastro') as HTMLInputElement;
    const email_cadastro = document.getElementById('email_cadastro') as HTMLInputElement;
    const password = document.getElementById('senha_cadastro') as HTMLInputElement;
    console.log(email_cadastro.value)

    const userCadastrado = await (window as any).dbAPI.verificarUserCadastrado(email_cadastro.value);

    if(userCadastrado?.id){
        console.log("Usuário já possui cadastro.")
        return
        
    }

    const novoUser = {
        nome: nome_cadastro.value,
        cpf: cpf_cadastro.value,
        email_cadastro: email_cadastro.value,
        password: password.value
    }

    await (window as any).dbAPI.cadastrarUser(novoUser);

})  