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
    nomeInsumo.value = "";
    quantidadeInsumo.value = "";
    precoUnitario.value = "";

    window.location.reload()
    
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

        
        const colunaAtualizar = document.createElement('td')
        const buttonAtualizar = document.createElement("button");
        buttonAtualizar.classList.add('btn-atualizar')
        buttonAtualizar.innerText = "Atualizar insumo";
        buttonAtualizar.setAttribute('id', insumo.id);
        colunaAtualizar.appendChild(buttonAtualizar);
        linhaTabela.appendChild(colunaAtualizar);


        //atualizar a qtd de insumos
        buttonAtualizar.addEventListener("click", async(event: MouseEvent) =>{
            event.preventDefault();
            console.log(insumo.id);
            atualizarInsumo(insumo.id)
            const divFormUpdate = document.getElementById('att-area');
            show(divFormUpdate, true);
        })
        
        const colunaApagar = document.createElement('td')
        const buttonDeletar = document.createElement("button");
        buttonDeletar.classList.add('btn-apagar');
        buttonDeletar.innerText = "Apagar insumo";
        colunaApagar.appendChild(buttonDeletar);
        linhaTabela.appendChild(colunaApagar);


        buttonDeletar.addEventListener("click", async(event: MouseEvent) =>{
            const confirmar = window.confirm("Você tem certeza de que deseja realizar esta ação?");
  
            if (confirmar) {
                console.log('confirmou');
                apagarInsumo(insumo.id)
                corpoTabela.removeChild(linhaTabela);
            } else {
               console.log('saiu')
            }

        })


        corpoTabela.appendChild(linhaTabela);

    });
}


document.getElementById('btn-atualizar')?.addEventListener('click', async (event: MouseEvent) => {
    event.preventDefault();

    const idInsumo = (document.getElementById('idInsumo') as HTMLInputElement).value;
    const nomeInsumo = (document.getElementById('attNomeInsumo') as HTMLInputElement).value;
    const quantidadeInsumo = (document.getElementById('attQuantidadeInsumo') as HTMLInputElement).value;
    const precoUnitario = (document.getElementById('attPrecoUnitario') as HTMLInputElement).value;

    const insumoAtualizado = {
        nome_insumo: nomeInsumo,
        quantidade: quantidadeInsumo,
        preco_unitario: precoUnitario
    };

    
    try {
        await (window as any).insumoApi.atualizarInsumo(insumoAtualizado, idInsumo);
        console.log("Insumo atualizado:", insumoAtualizado, idInsumo);

       
        const divFormUpdate = document.getElementById('att-area');
        show(divFormUpdate, false);

        
        window.location.reload()
    } catch (error) {
        console.error("Erro ao atualizar insumo:", error);
    }
});


async function atualizarInsumo(id: string){

    try {
        const dadosDoInsumo = await (window as any).insumoApi.trazerInsumoPorId(id);
        console.log(dadosDoInsumo);

        const idInsumo = document.getElementById('idInsumo') as HTMLInputElement;
        const nomeInsumo = document.getElementById('attNomeInsumo') as HTMLInputElement;
        const quantidadeInsumo = document.getElementById('attQuantidadeInsumo') as HTMLInputElement;
        const precoUnitario = document.getElementById('attPrecoUnitario') as HTMLInputElement;

        
        idInsumo.value = dadosDoInsumo.id;
        nomeInsumo.value = dadosDoInsumo.nome_insumo;
        quantidadeInsumo.value = dadosDoInsumo.quantidade; 
        precoUnitario.value = dadosDoInsumo.preco_unitario; 

        console.log("Dados do insumo preenchidos:", dadosDoInsumo);
    } catch (error) {
        console.error("Erro ao buscar dados do insumo:", error);
    }
}



async function apagarInsumo(id: string){
    try {
        (window as any).insumoApi.apagarInsumo(id);

    } catch (error) {
        console.log(error)
    }
    
}

function show(html: HTMLElement, status: boolean){

    if(status){
        html.classList.remove('disabled')
    }else{
        html.classList.add('disabled')
    }
    
}



document.getElementById('btn-fechar')?.addEventListener('click', () =>{
    const divFormUpdate = document.getElementById('att-area') as HTMLElement;
    show(divFormUpdate, false);
})