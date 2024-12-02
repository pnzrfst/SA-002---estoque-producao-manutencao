
import "./css/producao.css"

document.getElementById('btn-home').addEventListener('click',async (event : MouseEvent) => {
    (window as any).navigationApi.irHome();
})


window.onload = async function() {
    await mostrarProducao();
};


let insumosUsados : any[] = []

document.getElementById('procurarInsumo').addEventListener("click", async (event: MouseEvent) => {
    event.preventDefault();

    const procurarInsumo = document.getElementById('searchBar') as HTMLInputElement;
    
    const insumoEncontrado = await (window as any).insumoApi.trazerInsumoPorNome(procurarInsumo.value);

    
    const insumoJaAdicionado = insumosUsados.find(insumo => insumo.insumoId === insumoEncontrado.id);

    if (insumoJaAdicionado) {
        alert(`O insumo ${insumoEncontrado.nome_insumo} já foi adicionado.`);
    } else {
        const mostrarInsumos = document.getElementById('mostrarItens');
        const li = document.createElement("li");

        const nome = document.createElement("h3");
        nome.innerText = insumoEncontrado.nome_insumo;

        const selecionarQtd = document.createElement('input');
        selecionarQtd.placeholder = 'Insira a quantidade que deseja selecionar, de 1 a 10.';

        const quantidade = document.createElement('p');
        quantidade.innerText = `Quantidade em estoque: ${insumoEncontrado.quantidade}`;

        const btnAdicionar = document.createElement('button');
        btnAdicionar.innerText = 'Adicionar insumo ao veículo';
        btnAdicionar.id = 'btn-adicionar';

        btnAdicionar.addEventListener('click', async(event: MouseEvent) => {
            event.preventDefault()

            var quantidadeSelecionada = parseFloat(selecionarQtd.value);
            
            if (isNaN(quantidadeSelecionada) || quantidadeSelecionada <= 0) {
                alert("por favor, insira uma quantidade válida.");
                return; 
            }

            
            if (quantidadeSelecionada > insumoEncontrado.quantidade) {
                alert(`estoque insuficiente para o insumo ${insumoEncontrado.nome_insumo}`);
                return;
            }

            
            const insumoAdicionado = {
                insumoId: insumoEncontrado.id,    
                nome: insumoEncontrado.nome_insumo, 
                quantidade: quantidadeSelecionada  
            };

           
            const insumoExistente = insumosUsados.find(insumo => insumo.insumoId === insumoAdicionado.insumoId);
            if (insumoExistente) {
                insumoExistente.quantidade += insumoAdicionado.quantidade;
            } else {
                insumosUsados.push(insumoAdicionado);
            }

            console.log(insumosUsados); 
            console.log(` ${insumoAdicionado.nome} adicionado com quantidade ${quantidadeSelecionada}`);
        });

        li.appendChild(nome);
        li.appendChild(selecionarQtd);
        li.appendChild(quantidade);
        li.appendChild(btnAdicionar);

        mostrarInsumos.appendChild(li);
    }

    procurarInsumo.value = "";

});


document.getElementById('salvarProducao').addEventListener('click', async(event: MouseEvent) =>{
    event.preventDefault();

    var idVeiculo = document.getElementById('idVeiculo') as HTMLInputElement
    var chassi = (document.getElementById('chassiVeiculo') as HTMLInputElement).value;
    var modelo = (document.getElementById('modeloVeiculo') as HTMLInputElement).value;
    var cor = (document.getElementById('corVeiculo') as HTMLInputElement).value;


    const novoVeiculo = {
        chassi: chassi,
        modelo: modelo,
        cor: cor
    }

    const veiculo = await (window as any).veiculoApi.cadastrarVeiculo(novoVeiculo);
    console.log(veiculo.id)
   
    idVeiculo.value = veiculo.id

    

    chassi = ""
    modelo = ""
    cor = ""

    
    for (const insumo of insumosUsados) {
        const quantidadeUsada = 10; 
        console.log(insumo);
        console.log(insumosUsados);


        if (insumo.quantidade >= quantidadeUsada) {
           
           

            console.log(idVeiculo);  
            console.log(insumo);  
            console.log(quantidadeUsada); 

            
            const associarInsumoVeiculo = {
                fk_veiculo: idVeiculo.value,  
                fk_insumo: insumo.insumoId,    
                quantidade: quantidadeUsada
            };

            
            await (window as any).insumo_veiculoApi.cadastrar(associarInsumoVeiculo);
            console.log(`Insumo ${insumo.nome_insumo} associado ao veículo ${veiculo.id}`);


            await (window as any).insumoApi.descontarInsumo(associarInsumoVeiculo.fk_insumo, quantidadeUsada);


        } else {
            console.error(`Estoque insuficiente para o insumo ${insumo.nome_insumo}`);
            alert(`Estoque insuficiente para o insumo ${insumo.nome_insumo}`);
        }
    }

    
    insumosUsados.length = 0;
    limparCampos()
    window.location.reload()
})




//funcao limpar campo
function limparCampos() {
   
     (document.getElementById('chassiVeiculo') as HTMLInputElement).value = '';
     (document.getElementById('modeloVeiculo') as HTMLInputElement).value = '';
     (document.getElementById('corVeiculo') as HTMLInputElement).value = '';
     (document.getElementById('idVeiculo') as HTMLInputElement).value = '';
}



//funcao para adicionar na tela
async function mostrarProducao() {
    const listaVeiculos = document.getElementById('listaVeiculos') as HTMLUListElement;
    
    
    const producoes = await (window as any).veiculoApi.trazerVeiculos()


    producoes.forEach((producao : any) => {
        
     const li = document.createElement("li");
     li.classList.add('veiculoItem');

     const idVeiculo = document.createElement("h3");
     idVeiculo.innerText = `ID: ${producao.id}`;

     const chassiVeiculo = document.createElement("p");
     chassiVeiculo.innerText = `Chassi: ${producao.chassi}`;

     const modeloVeiculo = document.createElement("p");
     modeloVeiculo.innerText = `Modelo: ${producao.modelo}`;

     const corVeiculo = document.createElement("p");
     corVeiculo.innerText = `Cor: ${producao.cor}`;
    
     const inicioProducao = document.createElement("p");
     inicioProducao.innerText = `Inicio da produção: ${producao.inicio_producao}`
     
     const fimProducao = document.createElement("p");
     fimProducao.innerText = `Fim da produção: ${producao.fim_producao}`
     

      //Adiciona os elementos à lista
     li.appendChild(idVeiculo);
     li.appendChild(chassiVeiculo);
     li.appendChild(modeloVeiculo);
     li.appendChild(corVeiculo);
     li.appendChild(inicioProducao);
     li.appendChild(fimProducao);

     listaVeiculos.appendChild(li);
    });
    

}