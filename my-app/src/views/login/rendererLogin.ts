import "../../index.css"

document.getElementById("btn-cadastro").addEventListener("click", async(event: MouseEvent) =>{
    event.preventDefault()
    console.log('entrou');
    (window as any).navigationApi.irCadastro()
})


document.getElementById("btn-login").addEventListener("click", async (event: MouseEvent) => {
    event.preventDefault();
  
    const email = document.getElementById("email") as HTMLInputElement;
    const senha = document.getElementById("senha") as HTMLInputElement;
  
    const usuario = await (window as any).dbAPI. acharContaCadastrada(email.value)
    if(!usuario){
      console.log("USUÁRIO NÃO EXISTE...")
      return;
    }
  
    const passwordConfirmation = {
      senha: senha.value,
      password_hash: usuario.password_hash as string
    }
  
    const senhaCorreta = await (window as any).authApi.hash(passwordConfirmation);
  
    if(!senhaCorreta){
      console.log("Credenciais estão incorretas...")
      return;
    }
  
    (window as any).navigationAPI.irHome();
  })