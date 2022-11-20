const X_CLASSE = 'x';
const CIRCULO_CLASSE = 'circulo';
const COMBINACOES_VITORIAS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
const cellElements = document.querySelectorAll('[data-cell]');
const tabuleiro = document.getElementById('tabuleiro');
const vencedorMensagemElement = document.getElementById('mensagemVitoria');
const botaoRestart = document.getElementById('BotaoRestart');
const vencedorMensagemTextElement = document.querySelector('[data-mensagem-vitoria-texto]');
let vezCirculo;

iniciaJogo();

botaoRestart.addEventListener('click', iniciaJogo);

function iniciaJogo() {
    vezCirculo = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASSE);
        cell.classList.remove(CIRCULO_CLASSE);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, {once: true})
    });
    setHoverTabuleiro();
    vencedorMensagemElement.classList.remove('mostra');
}

function handleClick(e) {
    const cell = e.target
    const classeAtual = vezCirculo ? CIRCULO_CLASSE : X_CLASSE;
    poeMarca(cell, classeAtual);
    if(verificaVitoria(classeAtual)) {
        terminaJogo(false)
    } else if (ehEmpate()) {
        terminaJogo(true);
    } else {

    }
    //Verifica Vitoria
    //Verifica Empate
    //Troca turnos
    trocaTurnos();
    setHoverTabuleiro();
}

function terminaJogo(empate) {
    if(empate){
        vencedorMensagemTextElement.innerText = "Empate!"
    } else {
        vencedorMensagemTextElement.innerText = vezCirculo ? "O's vencem!" : "X's vencem!";
    }
    vencedorMensagemElement.classList.add('mostra');
}

function ehEmpate() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASSE) || cell.classList.contains(CIRCULO_CLASSE);
    });
}

function poeMarca(cell, classeAtual) {
    cell.classList.add(classeAtual);
}

function trocaTurnos() {
    vezCirculo = !vezCirculo;
}

function setHoverTabuleiro() {
    tabuleiro.classList.remove(X_CLASSE);
    tabuleiro.classList.remove(CIRCULO_CLASSE);
    if(vezCirculo) {
        tabuleiro.classList.add(CIRCULO_CLASSE);
    } else {
        tabuleiro.classList.add(X_CLASSE);
    }
}

function verificaVitoria(classeAtual) {
   return COMBINACOES_VITORIAS.some(combinacao => {
     return combinacao.every(index => {
        return cellElements[index].classList.contains(classeAtual);
     });
   });
}