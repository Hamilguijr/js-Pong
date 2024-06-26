// variaveis da bolinha
let xBolinha = 100;
let yBolinha = 200;
let diametro = 13;
let raio = diametro/2;

// velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

// variaveis das raquetes
let raqueteComprimento = 10;
let raqueteAltura = 90;

// variaveis da raquete azul
let xRaqueteAzul = 585;
let yRaqueteAzul = 150;

// variaveis da raquete azul vermelha
let xRaqueteVermelho = 5;
let yRaqueteVermelho = 150;

// placar do jogo
let pontosAzul = 0;
let pontosVermelho = 0;

// sons do jogo
let ponto;
let raquetada;
let trilha;

let colidiu = false;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaqueteAzul, yRaqueteAzul, "blue");
  mostraRaquete(xRaqueteVermelho, yRaqueteVermelho, "red");
  movimentaRaqueteAzul();
  movimentaRaqueteVermelha();
  verifaColisaoRaquete(xRaqueteAzul, yRaqueteAzul);
  verifaColisaoRaquete(xRaqueteVermelho,  yRaqueteVermelho);
  incluiPlacar();
  marcaPontos();
}

function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);  
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
  }
  
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x, y, cor){
  stroke("white");
  fill(cor);
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaRaqueteAzul() {
  if(keyIsDown(UP_ARROW)) {
    yRaqueteAzul -= 10;
  }
  if(keyIsDown(DOWN_ARROW)) {
    yRaqueteAzul += 10;
  }
}

function movimentaRaqueteVermelha(){
  if(keyIsDown(87)) {
    yRaqueteVermelho -= 10;
  }
  if(keyIsDown(83)) {
    yRaqueteVermelho += 10;
  }
}

function verifaColisaoRaquete(x, y) {
  colidiu =
    
  collideRectCircle(x, y,  raqueteComprimento, raqueteAltura, xBolinha,  yBolinha, raio);
  if(colidiu) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function incluiPlacar(){
  stroke(255)
  textAlign(CENTER);
  textSize(16);
  
  fill(255, 140, 0);
  rect(150, 10, 40, 20);
  fill(255, 140, 0);
  rect(450, 10, 40, 20);
  
  fill(255);
  text(pontosAzul, 170, 26);
  text(pontosVermelho, 470, 26);
  
}

function marcaPontos(){
  if (xBolinha > 595) {
    pontosAzul += 1;
    ponto.play();
  }
  
  if (xBolinha < 5){
    pontosVermelho += 1;
    ponto.play();
  }
}