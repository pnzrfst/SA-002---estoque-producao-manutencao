let producao = [];
let insumos = [];
let insumoEditandoId = null; 

document.getElementById('form_producao').addEventListener('submit', function (e) {
    e.preventDefault();  

    const chassi = document.getElementById('chassi').value.trim();
    const modeloVeiculo = document.getElementById('modelo_veiculo').value.trim();
    const cor = document.getElementById('cor').value.trim();  

    if (chassi === '' || modeloVeiculo === '' || cor === '') {
        alert("POR FAVOR, PREENCHA TODOS OS CAMPOS DA PRODUCAO");
        return;
    }

    const novaProducao = {
        id: Math.floor(Math.random() * 1000000),  
        chassi: chassi,
        modeloVeiculo: modeloVeiculo,
        cor: cor
    };

    producao.push(novaProducao);
    localStorage.setItem('producao', JSON.stringify(producao));

    alert("Produção iniciada!");
    document.getElementById('form_producao').reset();  
});

document.getElementById('form_insumo').addEventListener('submit', function (e) {
    e.preventDefault();

    const nomeInsumo = document.getElementById('nome_insumo').value.trim();
    const quantidadeInsumo = document.getElementById('quantidade_insumo').value.trim();

    if (nomeInsumo === '' || quantidadeInsumo === '') {
        alert("POR FAVOR, PREENCHA TODOS OS CAMPOS DO INSUMO.");
        return;
    }

    if (isNaN(quantidadeInsumo) || quantidadeInsumo <= 0) {
        alert("A QUANTIDADE DEVE SER UM NUMERO POSITIVO.");
        return;
    }

    const producaoAtual = producao.length > 0 ? producao[producao.length - 1] : null;

    const novoInsumo = {
        id: Math.floor(Math.random() * 1000000), 
        nome: nomeInsumo,
        quantidade: quantidadeInsumo,
        producaoId: producaoAtual ? producaoAtual.id : null,
        chassi: producaoAtual ? producaoAtual.chassi : '',
        modeloVeiculo: producaoAtual ? producaoAtual.modeloVeiculo : '',
        cor: producaoAtual ? producaoAtual.cor : ''
    };

    insumos.push(novoInsumo);
    localStorage.setItem('insumos', JSON.stringify(insumos));

    renderInsumos();
    document.getElementById('form_insumo').reset();
});

function renderInsumos() {
    const listaInsumos = document.getElementById('insumo-list');
    listaInsumos.innerHTML = '';

    insumos.forEach(insumo => {
        const producaoInfo = producao.find(p => p.id === insumo.producaoId);

        const li = document.createElement('li');
        li.innerHTML = `
            <div class="insumo-info">
                <p><strong>Nome do Insumo:</strong> ${insumo.nome}</p>
                <p><strong>Quantidade:</strong> ${insumo.quantidade}</p>
                ${producaoInfo ? `
                    <p><strong>Chassi:</strong> ${producaoInfo.chassi}</p>
                    <p><strong>Modelo:</strong> ${producaoInfo.modeloVeiculo}</p>
                    <p><strong>Cor:</strong> ${producaoInfo.cor}</p>
                ` : ''}
                <button class="btn-editar" onclick="editarInsumo(${insumo.id})">Editar</button>
                <button class="btn-excluir" onclick="deletarInsumo(${insumo.id})">Excluir</button>
            </div>
        `;
        listaInsumos.appendChild(li);
    });
}

function editarInsumo(id) {
    insumoEditandoId = id;
    const insumo = insumos.find(i => i.id === id);
    const producaoInfo = producao.find(p => p.id === insumo.producaoId);

    document.getElementById('modal-nome').value = insumo.nome;
    document.getElementById('modal-quantidade').value = insumo.quantidade;
    document.getElementById('modal-chassi').value = producaoInfo ? producaoInfo.chassi : '';
    document.getElementById('modal-modelo').value = producaoInfo ? producaoInfo.modeloVeiculo : '';
    document.getElementById('modal-cor').value = producaoInfo ? producaoInfo.cor : '';

    document.getElementById('modal-edicao').style.display = 'flex';
}

document.getElementById('btn-salvar-edicao').addEventListener('click', function() {
    const nome = document.getElementById('modal-nome').value.trim();
    const quantidade = document.getElementById('modal-quantidade').value.trim();
    const chassi = document.getElementById('modal-chassi').value.trim();
    const modelo = document.getElementById('modal-modelo').value.trim();
    const cor = document.getElementById('modal-cor').value.trim();

    if (nome && quantidade && chassi && modelo && cor) {
        const insumoIndex = insumos.findIndex(i => i.id === insumoEditandoId);
        const producaoIndex = producao.findIndex(p => p.id === insumos[insumoIndex].producaoId);

        insumos[insumoIndex] = { 
            ...insumos[insumoIndex], 
            nome, 
            quantidade,
            chassi,
            modeloVeiculo: modelo,
            cor
        };

        if (producaoIndex !== -1) {
            producao[producaoIndex] = { 
                ...producao[producaoIndex], 
                chassi, 
                modeloVeiculo: modelo, 
                cor 
            };
        }

        localStorage.setItem('insumos', JSON.stringify(insumos));
        localStorage.setItem('producao', JSON.stringify(producao));

        renderInsumos();
        fecharModal();
    } else {
        alert("POR FAVOR, PREENCHA TODOS OS CAMPOS.");
    }
});

function fecharModal() {
    document.getElementById('modal-edicao').style.display = 'none';
}

function deletarInsumo(id) {
    insumos = insumos.filter(insumo => insumo.id !== id);
    localStorage.setItem('insumos', JSON.stringify(insumos));
    renderInsumos();
}

window.onload = function () {
    const insumosLocalStorage = localStorage.getItem('insumos');
    if (insumosLocalStorage) {
        insumos = JSON.parse(insumosLocalStorage);
        renderInsumos();
    }

    const producaoLocalStorage = localStorage.getItem('producao');
    if (producaoLocalStorage) {
        producao = JSON.parse(producaoLocalStorage);
    }
};

