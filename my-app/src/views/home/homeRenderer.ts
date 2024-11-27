import "./css/home.css"

//abrir o menu
document.getElementById('menu-toggle').addEventListener("click", () => {
    const menu = document.getElementById("menu");
    menu.classList.toggle("active"); 
})

//lidar com a navegaçâo
document.getElementById('btn_producao').addEventListener('click', async(event: MouseEvent)=>{
    event.preventDefault()
    console.log('entrou');
    (window as any).navigationApi.irProducao()
})

document.getElementById('btn_manutencao').addEventListener('click', async(event: MouseEvent)=>{
    event.preventDefault()
    console.log('entrou');
    (window as any).navigationApi.irManutencao();
})

document.getElementById('btn_insumo').addEventListener('click', async(event: MouseEvent)=>{
    event.preventDefault()
    console.log('entrou');
    (window as any).navigationApi.irInsumos();
})

//

console.log("deu certo");