import "./css/insumo.css"

window.onload = async function() {
    await mostrarInsumos();
};
document.getElementById('btn-home').addEventListener('click',async (event : MouseEvent) => {
    (window as any).navigationApi.irHome();
})

document.getElementById('salvarInsumo').addEventListener('click', async(event: MouseEvent) =>{
    event.preventDefault()
    var nomeProduto = document.getElementById('nomeProduto') as HTMLInputElement
    var quantidadeProduto = document.getElementById('quantidadeProduto') as HTMLInputElement
    var precoUnitario = document.getElementById('precoUnitario') as HTMLInputElement
    
    
    const produtoCadastrado = await (window as any).insumoApi.verificarInsumoCadastrado(nomeProduto)
    if(produtoCadastrado){
      console.log("Esse produto já está cadastrado em nossas bases de dados.")
      return;
    }

    const novoInsumo = {
        nome_insumo: nomeProduto.value,
        quantidade: quantidadeProduto.value,
        preco_unitario: precoUnitario.value
    }

    await (window as any).insumoApi.salvarInsumo(novoInsumo);
    mostrarInsumos()
    
    nomeProduto.value = ""
    quantidadeProduto.value = ""
    precoUnitario.value = ""
})


const mostrarInsumos = async() =>{
    const corpoTabela = document.getElementById('tbody')
    corpoTabela.innerHTML = ""

    const insumos = await (window as any).insumoApi.trazerInsumos()

    insumos.forEach((insumo: any) => {
        const linhaTabela = document.createElement("tr");

        const id = document.createElement("td");
        id.innerText = insumo.id;
        linhaTabela.appendChild(id)

        const nomeInsumo = document.createElement("td");
        nomeInsumo.innerText = insumo.nome_insumo;
        linhaTabela.appendChild(nomeInsumo)

        const quantidadeInsumo = document.createElement("td");
        quantidadeInsumo.innerText = insumo.quantidade;
        linhaTabela.appendChild(quantidadeInsumo)

        const precoUnitario = document.createElement("td");
        precoUnitario.innerText = insumo.preco_unitario;
        linhaTabela.appendChild(precoUnitario)

        const buttonAtualizar = document.createElement("button");
        buttonAtualizar.innerText = "Atualizar insumo";
        linhaTabela.appendChild(buttonAtualizar)

        const buttonDeletar = document.createElement("button");
        buttonDeletar.innerText = "Apagara insumo";
        linhaTabela.appendChild(buttonDeletar);

        corpoTabela.appendChild(linhaTabela)

    });
}


