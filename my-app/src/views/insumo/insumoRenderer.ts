import "./css/insumo.css"

window.onload = async function() {
    await mostrarInsumos();
};
document.getElementById('btn-home').addEventListener('click',async (event : MouseEvent) => {
    (window as any).navigationApi.irHome();
})

document.getElementById('salvarInsumo').addEventListener('click', async(event: MouseEvent) =>{
    event.preventDefault()
    var nomeInsumo = document.getElementById('nomeInsumo') as HTMLInputElement;
    var quantidadeInsumo = document.getElementById('quantidadeInsumo') as HTMLInputElement;
    var precoUnitario = document.getElementById('precoUnitario') as HTMLInputElement;
    
    
    const InsumoCadastrado = await (window as any).insumoApi.verificarInsumoCadastrado(nomeInsumo);
    if(InsumoCadastrado){
      console.log("Esse Insumo já está cadastrado em nossas bases de dados.");
      return;
    }

    const novoInsumo = {
        nome_insumo: nomeInsumo.value,
        quantidade: quantidadeInsumo.value,
        preco_unitario: precoUnitario.value
    }

    await (window as any).insumoApi.salvarInsumo(novoInsumo);
    mostrarInsumos();
    
    nomeInsumo.value = "";
    quantidadeInsumo.value = "";
    precoUnitario.value = "";
})


const mostrarInsumos = async() =>{
    const corpoTabela = document.getElementById('tbody');
    corpoTabela.innerHTML = "";

    const insumos = await (window as any).insumoApi.trazerInsumos()

    insumos.forEach((insumo: any) => {
        const linhaTabela = document.createElement("tr");

        const id = document.createElement("td");
        id.innerText = insumo.id;
        linhaTabela.appendChild(id);

        const nomeInsumo = document.createElement("td");
        nomeInsumo.innerText = insumo.nome_insumo;
        linhaTabela.appendChild(nomeInsumo);

        const quantidadeInsumo = document.createElement("td");
        quantidadeInsumo.innerText = insumo.quantidade;
        linhaTabela.appendChild(quantidadeInsumo);

        const precoUnitario = document.createElement("td");
        precoUnitario.innerText = insumo.preco_unitario;
        linhaTabela.appendChild(precoUnitario);

        const buttonAtualizar = document.createElement("button");
        buttonAtualizar.id = 'btnAtualizar'
        buttonAtualizar.innerText = "Atualizar insumo";
        buttonAtualizar.setAttribute('id', insumo.id);
        linhaTabela.appendChild(buttonAtualizar);


        //atualizar a qtd de insumos
        buttonAtualizar.addEventListener("click", async(event: MouseEvent) =>{
            event.preventDefault();
            console.log(insumo.id)
            const divFormUpdate = document.getElementById('att-area');
            show(divFormUpdate);
            pegarInfosInsumo(insumo.id);
        })

        const buttonDeletar = document.createElement("button");
        buttonAtualizar.classList.add('btn-deletar')
        buttonDeletar.innerText = "Apagar insumo";
        linhaTabela.appendChild(buttonDeletar);

        corpoTabela.appendChild(linhaTabela)

    });
}


 //escutar para atualizar
 document.getElementById('btn-atualizar').addEventListener('click', async(event: MouseEvent) =>{
    const
})


async function atualizarInsumo(id: string){

    const dadosDoInsumo = await (window as any).insumoApi.trazerInsumoPorId(id)

    var nomeInsumo = document.getElementById('attNomeInsumo') as HTMLInputElement
    var quantidadeInsumo = document.getElementById('attQuantidadeInsumo') as HTMLInputElement
    var precoUnitario = document.getElementById('attPrecoUnitario') as HTMLInputElement


    const insumoAtualizado = { 
        nomeInsumo : dadosDoInsumo.nome_insumo,
        quantidade :  dadosDoInsumo.quantidade,
        precoUnitario : dadosDoInsumo.preco_unitario
    }

    console.log(insumoAtualizado)

   await (window as any).insumoApi.atualizarInsumo(insumoAtualizado, id)
}


async function pegarInfosInsumo(id : string){
    const dadosDoInsumo = await (window as any).insumoApi.trazerInsumoPorId(id)

    var nomeInsumo = document.getElementById('attNomeInsumo') as HTMLInputElement
    var quantidadeInsumo = document.getElementById('attQuantidadeInsumo') as HTMLInputElement
    var precoUnitario = document.getElementById('attPrecoUnitario') as HTMLInputElement

    nomeInsumo.value = dadosDoInsumo.nome_insumo
    quantidadeInsumo.value = dadosDoInsumo.quantidade
    precoUnitario.value = dadosDoInsumo.preco_unitario

}


function show(html: HTMLElement){
    html.classList.remove('disabled')
}
