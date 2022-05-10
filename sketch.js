//variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let Diametro = 15;
let raio = Diametro / 2;

//velocidade da bolinha
let velocidadexBolinha = 6;
let velocidadeyBolinha = 6;

//variaveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let comprimentoRaquete = 10;
let alturaRaquete = 90;

//variaveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeyOponente;

let colidiu = false;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete();
  movimentaMinhaRaquete();

  //verificaColisaoRaquete();
  mostraRaqueteOponente();
  verificaColisaoMinhaRaqueteBiblioteca();
  movimentaRaqueteOponente();
  verificaColisaoRaqueteOponente();
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha() {
  circle(xBolinha, yBolinha, Diametro);
}
function movimentaBolinha() {
  xBolinha += velocidadexBolinha;
  yBolinha += velocidadeyBolinha;
}

function verificaColisaoBorda() {
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadexBolinha *= -1;
  }
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeyBolinha *= -1;
  }
}

function mostraRaquete() {
  rect(xRaquete, yRaquete, comprimentoRaquete, alturaRaquete);
}

function mostraRaqueteOponente() {
  rect(xRaqueteOponente, yRaqueteOponente, comprimentoRaquete, alturaRaquete);
}

function movimentaMinhaRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }
}

function verificaColisaoRaquete() {
  if (
    xBolinha - raio < xRaquete + comprimentoRaquete &&
    yBolinha - raio < yRaquete + alturaRaquete &&
    yBolinha + raio > yRaquete
  ) {
    velocidadexBolinha *= -1;
  }
}

function verificaColisaoMinhaRaqueteBiblioteca() {
  colidiu = collideRectCircle(
    xRaquete,
    yRaquete,
    comprimentoRaquete,
    alturaRaquete,
    xBolinha,
    yBolinha,
    raio
  );
  if (colidiu) {
    velocidadexBolinha *= -1;
  }
}

function movimentaRaqueteOponente() {
  velocidadeyOponente = yBolinha - yRaqueteOponente - alturaRaquete / 2 - 50;
  yRaqueteOponente += velocidadeyOponente;
}

function verificaColisaoRaqueteOponente() {
  colidiu = collideRectCircle(
    xRaqueteOponente,
    yRaqueteOponente,
    comprimentoRaquete,
    alturaRaquete,
    xBolinha,
    yBolinha,
    raio
  );
  if (colidiu) {
    velocidadexBolinha *= -1;
  }
}

function incluiPlacar() {
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosDoOponente, 470, 26);
}

function marcaPonto() {
  if (xBolinha + raio >= 599) {
    meusPontos += 1;
  }
  if (xBolinha - raio <= 1) {
    pontosDoOponente += 1;
  }
}
