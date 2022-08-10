var bg, bgImg;
var boy, boy1, boy2;
var leaf, leafImg;
var edge;
var leafGroup;
var invisibleBlock;
var invisibleBlockGroup;
var jumpSound;
var PLAY = 1;
var END = 0;
var score = 0
var coin, coinImg

var gameState = PLAY;

function preload(){
  bgImg = loadImage("images/bg.png");
  boy1 = loadImage("images/boy1.png");
  leafImg= loadImage("images/leaf.png");
  coinImg = loadImage("images/coin.png")
  //umpSound = loadSound("jump.mp3");
}

function setup(){
  createCanvas(800,450);
  bg = createSprite(300,110);
  bg.addImage(bgImg);
  bg.scale = 1.4
  
  boy = createSprite(300,100);
  boy.addImage(boy1);
  boy.scale= 0.3;
  //boy.debug = true
  
  
  edge = createEdgeSprites();
  
  leafGroup = new Group();
  coinGroup = new Group();
  invisibleBlockGroup = new Group();

  replayButton  = createButton("REPLAY")
  replayButton.position(330,350)
  replayButton.size(100,50)
  replayButton.mousePressed(replay)
}

function draw(){
  //background("blue");//
  coins()
  replayButton.hide()
  if(gameState === PLAY){
  leaves();
  

  if(bg.y>300 ){
    bg.y = 110; 
  }
  
  bg.velocityY = 2;
  
  if(keyDown("space")){
    boy.velocityY = -5;
    //jumpSound.play();
  }

  
  boy.velocityY = boy.velocityY+0.5; 
  boy. setCollider("rectangle",0,4,80,140)

  
  if(keyWentDown("right")){
    boy.velocityX = boy.velocityX+5;
  }
  if(keyWentUp("right")){
    boy.velocityX = 0;
  }
  
  if(keyWentDown("left")){
    boy.velocityX = boy.velocityX-5;
  }
  if(keyWentUp("left")){
    boy.velocityX = 0;
  }
  
  boy.bounceOff(edge[0]);
  boy.bounceOff(edge[1]);
  
  if(boy.isTouching(leafGroup)){
    boy.velocityY= 0;
  }
  if(boy.isTouching(invisibleBlockGroup)||boy.y>600){
    gameState = END; 
  }
  if (boy.isTouching(coinGroup)){
    boy.x +=50
    score = score+2
    coinGroup.destroyEach()
  }
  drawSprites();
  textSize(20)
  fill("black")
  text("Score: "+score, 550,50)
  
  }
  
  else if(gameState === END){
    background("Green");
    textSize(50);
    stroke("white");
    fill("white");
    text("Game Over", 250,225);
    //spookySound.stop();   
    replayButton.show()

  }

}

function leaves(){
  
  if(frameCount%300===0){
    
    leaf = createSprite(200,-5,30,30);
    leaf.velocityY = 1; 
    leaf.addImage(leafImg);
    leaf.x =  Math.round(random(50,500));
    leaf.lifetime = 500;
    leafGroup.add(leaf);
    leaf.scale = 0.4
    //leaf.debug = true
    leaf. setCollider("rectangle",0,0,200,150)
    
    boy.depth = leaf.depth;
    boy.depth+=1; 
    
    invisibleBlock = createSprite(200,65,130,20);
    invisibleBlock.velocityY = 1; 
    invisibleBlock.y = leaf.y + 40;
    invisibleBlock.x = leaf.x -0;
    invisibleBlock.lifetime = 500;
    invisibleBlockGroup.add(invisibleBlock);
    invisibleBlock.visible = false;
    
  }  
}

function coins(){
  
  if(frameCount%400===0){
    
    coin = createSprite(200,-5,30,30);
    coin.velocityY = 1; 
    coin.addImage(coinImg);
    coin.x =  Math.round(random(50,500));
    coin.lifetime = 500;
    coinGroup.add(coin);
    coin.scale = 0.1
    //coin.debug = true
    coin. setCollider("circle",0,0,200)
    
    boy.depth = coin.depth;
    boy.depth+=1; 
    
  }  
}


function replay(){
  replayButton.hide()
  gameState = PLAY
  boy.y = -500
  background("white")
  leafGroup.destroyEach()
  coinGroup.destroyEach()
  score = 0
}
