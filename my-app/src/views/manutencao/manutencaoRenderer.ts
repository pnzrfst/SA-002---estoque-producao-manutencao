import "./css/manutencao.css"

document.getElementById('btn-home').addEventListener('click',async (event : MouseEvent) => {
    (window as any).navigationApi.irHome();
})


window.onload = async function() {
    await mostrarProducao();
};


document.getElementById('finalizarManutencao').addEventListener('click', async(event: MouseEvent) =>{
    event.preventDefault();
    cadastrarManutencao()
}) 


async function mostrarProducao() {
    const listaVeiculos = document.getElementById('listaProducoes') as HTMLUListElement;
    
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
     inicioProducao.innerText = `Inicio da produção: ${producao.inicio_producao}`;
     
     const fimProducao = document.createElement("p");
     fimProducao.innerText = `Fim da produção: ${producao.fim_producao}`;
     
     const btnIniciarManutencao = document.createElement("button");
     btnIniciarManutencao.classList.add("iniciarManutencao");
     btnIniciarManutencao.innerText = "Cadastrar manutenção";
     btnIniciarManutencao.classList.add('btn_iniciarProd')
     btnIniciarManutencao.setAttribute('data-id', producao.id.toString());

     btnIniciarManutencao.addEventListener("click", () => {
        const fk_veiculo = btnIniciarManutencao.getAttribute('data-id');
        
        if (fk_veiculo) {
            // Exibe o formulário de cadastro
            const divFormCadasto = document.getElementById('cadastro-area');
            show(divFormCadasto, true);
            console.log('ID do veículo:', fk_veiculo);  // Depuração
        } else {
            console.error('fk_veiculo não encontrado');
        }
     });

     li.appendChild(idVeiculo);
     li.appendChild(chassiVeiculo);
     li.appendChild(modeloVeiculo);
     li.appendChild(corVeiculo);
     li.appendChild(inicioProducao);
     li.appendChild(fimProducao);
     li.appendChild(btnIniciarManutencao);

     listaVeiculos.appendChild(li);
    });
}

async function cadastrarManutencao() {
   
    const btnIniciarManutencao = document.querySelector('.iniciarManutencao[data-id]') as HTMLElement;
    const fk_veiculo = btnIniciarManutencao ? btnIniciarManutencao.getAttribute('data-id') : null;

    if (!fk_veiculo) {
        console.error('fk_veiculo não encontrado');
        return;
    }

   
    const idVeiculo = await (window as any).veiculoApi.trazerVeiculoPorId(fk_veiculo);
    
    
    var descricaoManutencao = document.getElementById('descricaoManutencao') as HTMLTextAreaElement;
    var valorManutencao = document.getElementById('valorManutencao') as HTMLInputElement;
    const fkveiculo = document.getElementById('fkveiculo') as HTMLInputElement;

    
    fkveiculo.value = idVeiculo.id;

    
    console.log(fk_veiculo, idVeiculo);

   
    const novaManutencao = {
        descricao: descricaoManutencao.value,
        valor: valorManutencao.value,
        fk_veiculo: idVeiculo.id
    };

   
    await (window as any).manutencaoApi.cadastrarManutencao(novaManutencao);

    
    descricaoManutencao.value = "";
    valorManutencao.value = "";

    
}


function show(html: HTMLElement, status: boolean){

    if(status){
        console.log('mostrou')
        html.classList.remove('disabled')
    }else{
        console.log('escondeu')
        html.classList.add('disabled')
    }
    
}


document.getElementById('btn-fechar')?.addEventListener('click', () =>{
    console.log('entrou')
    const divFormUpdate = document.getElementById('cadastro-area') as HTMLElement;
    show(divFormUpdate, false);
})
