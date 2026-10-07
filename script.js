let personagemDefault = document.getElementById("personagem-default");
let personagemDireita = document.getElementById("personagem-direita");
let personagemEsquerda = document.getElementById("personagem-esquerda");
let personagemFrente = document.getElementById("personagem-frente");
let personagemTras = document.getElementById("personagem-tras");

let botaoReiniciar = document.getElementById("jogar");
let contagemTempo = document.getElementById("contagem-tempo");

const paredes = document.getElementById("colisao-paredes");
const elementoPontos = document.getElementById("contagem-pontuacao");

const fantasmaAzul = document.getElementById("fantasma-azul");
const fantasmaRoxo = document.getElementById("fantasma-roxo");
const fantasmaBranco = document.getElementById("fantasma-branco");
const fantasmaVerde = document.getElementById("fantasma-verde");

const telaFinal = document.getElementById("fim-jogo")

let obstaculos = document.querySelectorAll(".obstaculo");
let personagem = document.querySelector(".player");

let jogoAtivo = true;
let pontos = 0;
let tempo = 30;

const larguraPersonagem = personagemDefault.clientWidth;
const alturaPersonagem = personagemDefault.clientHeight;

const alturaPernas = alturaPersonagem*0.30;

// DEFININDO ALTURA E LARGURA DA TELA----------
const larguraJogo = paredes.clientWidth;
const alturaJogo = paredes.clientHeight;
// ---------

// CONTA PARA SABER OS LIMITES HORIZONTAL E VERTICAL DA TELA
const limiteHorizontal = larguraJogo - larguraPersonagem;
const limiteVertical = alturaJogo - alturaPernas;
// -------

let posicaoX = 290;
let posicaoY = 230;

personagem.style.transform = `translate(${posicaoX}px, ${posicaoY}px)`;

// JOGADOR -------------------------------------------------------------------
document.addEventListener("keydown", function(evento){

    personagemDireita.style.opacity = "0";
    personagemEsquerda.style.opacity = "0";
    personagemFrente.style.opacity = "0";
    personagemTras.style.opacity = "0";

// PLAYER SE MOVE------------------    
    if(evento.key === "ArrowRight"){
        posicaoX +=15;
        personagemDireita.style.opacity = "1";
        personagemDefault.style.opacity = "0";
    };
    if(evento.key === "ArrowLeft"){
        posicaoX -=15;
        personagemEsquerda.style.opacity = "1";
        personagemDefault.style.opacity = "0";
    };

    if(evento.key === "ArrowDown"){
        posicaoY +=15;
        personagemFrente.style.opacity = "1";
        personagemDefault.style.opacity = "0";
    };
    if(evento.key === "ArrowUp"){
        posicaoY -=15;
        personagemTras.style.opacity = "1";
        personagemDefault.style.opacity = "0";
    };
    
    personagem.style.transform = `translate(${posicaoX}px, ${posicaoY}px)`;

//------------------
// FUNÇÕES------------------ 
    limitarMovimento() //NÃO PASSAR A PAREDE
    pegarFantasma() //CASO BATA NO FANTASMA
    verificarColisaoObstaculos(evento) //PARA NÃO PASSAR POR CIMA DE OBSTÁCULOS
// ------------------

});

document.addEventListener("keyup", function(evento){
    if(evento.key === "ArrowUp" || evento.key === "ArrowLeft" || evento.key === "ArrowRight" || evento.key === "ArrowDown"){
        personagemDireita.style.opacity = "0";
        personagemEsquerda.style.opacity = "0";
        personagemFrente.style.opacity = "0";
        personagemTras.style.opacity = "0";

        personagemDefault.style.opacity = "1";
    }; 
});


//-------------------------------------------------------------------

//FANTASMA -------------------------------------------------------------------

// LÓGICA PARA OS FANTASMAS APARECEREM ALEATÓRIAMENTE
function moverFantasma(fantasma){
// PARA O FANTASMA NÃO APARECER FORA DA TELA
    const larguraJogo = paredes.clientWidth;
    const alturaJogo = paredes.clientHeight;

    const limiteHorizontal = larguraJogo - fantasma.offsetWidth;
    const limiteVertical = alturaJogo - fantasma.offsetHeight;
// --------

// SORTEIO X E Y CRIADOS PARA DEFINIR, ALEATORIAMENTE, A LOCALIZAÇÃO DOS FANTASMAS
    sorteioX = Math.floor(Math.random() * limiteHorizontal);
    sorteioY = Math.floor(Math.random() * limiteVertical);

    fantasma.style.left = sorteioX + "px";
    fantasma.style.top = sorteioY + "px";
// -----

    fantasma.style.opacity = "1";
}


// FUNÇÃO PARA EVITAR REPETIÇÃO EXAGERADA
function aparecerFantasma(){
    moverFantasma(fantasmaAzul);
    moverFantasma(fantasmaRoxo);
    moverFantasma(fantasmaBranco);
    moverFantasma(fantasmaVerde); 
}
// -------

// FUNÇÃO PARA OS FANTASMAS SUMIREM
function sumirFantasma(){
    fantasmaAzul.style.opacity = "0";
    fantasmaRoxo.style.opacity = "0";
    fantasmaBranco.style.opacity = "0";
    fantasmaVerde.style.opacity = "0";
}
// ------

// FUNÇÃO PARA VERIFICAR A COLISÃO COM O FANTASMA + GANHAR PONTOS
function verificarColisaoFantasma(fantasma){
    const player = personagemDefault.getBoundingClientRect();

    if (fantasma.style.opacity === "1") {
        const f = fantasma.getBoundingClientRect();
        if (player.right > f.left && player.left < f.right && 
            player.bottom > f.top && player.top < f.bottom) {
            fantasma.style.opacity = "0";
                pontos++;
                elementoPontos.textContent = pontos;
        }
    }
}
//-------

// FUNÇÃO PARA EVITAR REPETIÇÕES DESNECESSÁRIAS
function pegarFantasma(){
    verificarColisaoFantasma(fantasmaAzul)
    verificarColisaoFantasma(fantasmaRoxo)
    verificarColisaoFantasma(fantasmaBranco)
    verificarColisaoFantasma(fantasmaVerde)
}
//-------

// CRONÔMETRO DO TEMPO PRO FANTASMA APARECER E SUMIR
const aparicaoFantasmas = setInterval(function() {
    sumirFantasma();
    setTimeout(aparecerFantasma, 100); 
}, 5000);
//------

// -------------------------------------------------------------------

//MOVIMENTAÇÃO DO PLAYER-----------------------------------------------

function limitarMovimento(){
// LÓGICA DAS POSIÇÕES
    if(posicaoX < 0) {posicaoX = 0;};
    if(posicaoY < 0) {posicaoY = 0;};
    if(posicaoX > limiteHorizontal) {posicaoX = limiteHorizontal;};
    if(posicaoY > limiteVertical) {posicaoY = limiteVertical;};        
// ------
};


function verificarColisaoObstaculos(evento){
// DEFININDO A ÁREA DO PLAYER
    const areaPersonagem = personagemDefault.getBoundingClientRect();
    const pernasTopo = areaPersonagem.bottom - alturaPernas;
// ------

// AQUI COMEÇA UM LAÇO FOR, QUE VAI PASSAR POR TODOS OS OBSTÁCULOS PARA COLISÃO
    obstaculos.forEach(function(obstaculo) {
        const areaObstaculo = obstaculo.getBoundingClientRect(); //ÁREA DO OBSTÁCULO

// CONDIÇÕES PARA SER CONSIDERADO UMA COLISÃO
        const houveColisao =
            areaPersonagem.right > areaObstaculo.left &&
            areaPersonagem.left < areaObstaculo.right &&
            areaPersonagem.bottom > areaObstaculo.top &&
            pernasTopo < areaObstaculo.bottom;
// -----
// SE HOUVER  COLISÃO, O PERSONAGEM RECUA
         if (houveColisao) {
            if (evento.key === "ArrowRight") { posicaoX -= 15; }
            if (evento.key === "ArrowLeft")  { posicaoX += 15; }
            if (evento.key === "ArrowDown")  { posicaoY -= 15; }
            if (evento.key === "ArrowUp")    { posicaoY += 15; }
        };
// ------
    });
};

//----------------------------------------------------------------------

// CONTAGEM DE TEMPO -----------

setTimeout(function(){
    cronometro = setInterval(function(){
        tempo--;

        contagemTempo.textContent = tempo;

        if(tempo <=0){
            finalizarJogo();
        }
    }, 1000);
},5000)

// ----------

// FIM DE JOGO ----------

function finalizarJogo(){
    jogoAtivo = false;
    clearInterval(cronometro);
    clearInterval(aparicaoFantasmas);
    sumirFantasma();

    telaFinal.style.opacity = "1";
    botaoReiniciar.addEventListener("click", function(){
        location.reload();

    })
}

// -------