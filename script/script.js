// Obtendo o Modal e os Botões
var modal = document.getElementById("myModal");
var openModalBtn = document.getElementById("openModalBtn");
var closeModalBtn = document.getElementById("closeModalBtn");

// Quando o botão de abrir o modal é clicado, ele será exibido
openModalBtn.onclick = function() {
    modal.style.display = "block";
}

// Quando o botão de fechar o modal é clicado, ele será escondido
closeModalBtn.onclick = function() {
    modal.style.display = "none";
}

// Quando o usuário clica fora do modal, ele também fecha
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
