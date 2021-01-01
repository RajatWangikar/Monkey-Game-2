var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey,monkeyrunning,ground;
var bananaImage,banana;
var rock,rockImage;
var rocksGroup,bananasGroup,bigbananasGroup;
var survivaltime;
var score;
var gameover,gameoverImage;
var bigbanana,bigbananaImage;
var gameoverdj;
var restart,restartImage;

function preload(){
  
  monkeyrunning =  loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  rockImage = loadImage("obstacle.png");
  gameoverImage = loadImage("gameover.png");
  bigbananaImage = loadImage("fruit4.png");
  gameoverdj = loadSound("gameover.mp3");
  restartImage = loadImage("restart.png");
  
}

function setup(){
  
  createCanvas(600,200);
  
  monkey = createSprite(50,150,20,20);
  monkey.addAnimation("running",monkeyrunning);
  monkey.scale = 0.1;
  
  ground = createSprite(0,195,2000,10);
  
  ground.x = ground.width/2;
  console.log(ground.x);
  
  gameover = createSprite(300,50);
  gameover.addImage(gameoverImage);
  
  restart = createSprite(300,100);
  restart.addImage(restartImage);
  restart.scale = 0.5;
  
  rocksGroup = new Group();
  bananasGroup = new Group();
  bigbananasGroup = new Group();
  
  score = 0;
  
  survivaltime = 0;
  
  monkey.setCollider("rectangle",0,0,200,monkey.height);
  //monkey.debug = true; 
  
} 

function draw(){
  
  background("green");
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score - - - " + score ,10,30);
  
  stroke("black");
  textSize(20);
  fill("black");
  
  text("Survival Time - - - " + survivaltime,400,30);
  
  if (gameState === PLAY){
    
    survivaltime = Math.ceil(frameCount/frameRate());
    
    restart.visible = false;
    ground.visible = true;
    monkey.visible = true;
    
    if (ground.x < 1000){
    ground.x = ground.width/2;
  }
    
     
    
    ground.velocityX = -(4+3*score/5);
  
  if(keyDown("space")&& monkey.y >= 158.3) {
    monkey.velocityY = -(16-score/20);
  }
    
    
  
  gameover.visible = false;
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  if (monkey.isTouching(bananasGroup)){
    bananasGroup.destroyEach(0);
    score = score+1;  
  }
    
    
    
  if (monkey.isTouching(bigbananasGroup)){
      bigbananasGroup.destroyEach();
      score = score+3;
  }
    
  if (monkey.isTouching(rocksGroup)){
      monkey.visible = false;
      gameoverdj.play();
      gameState = END;
  }
  
}
     
  if (gameState === END){
    
    ground.visible = false;
    monkey.visible = false;
    bananasGroup.destroyEach();
    rocksGroup.destroyEach();
    bigbananasGroup.destroyEach();
    gameover.visible = true;
    restart.visible = true;
    if (mousePressedOver(restart)){
      
  
  gameState = PLAY;
  gameover.visible = false;
  restart.visible = false;
      monkey.visible = true;
  if (monkey.isTouching(bananasGroup)){
    bananasGroup.destroyEach(0);
    score = score+1;  
  }
    
  if (monkey.isTouching(bigbananasGroup)){
      bigbananasGroup.destroyEach();
      score = score+3;
  }
      
      survivaltime = 0;
      survivaltime = Math.ceil(frameCount/frameRate());
    
  monkey.changeAnimation("running",monkeyrunning);
  score = 0;
  
}
  }
    
  
  
  
  
  monkey.collide(ground);
   
  drawSprites();
  spawnBananas();
  spawnObstacles();
  spawnBigbananas();
  
}

function spawnBananas(){
  
  if (frameCount % 100 === 0){
    var banana = createSprite(50,50,20,20);
    banana.velocityX = -6;
    banana.x = Math.round(random(400,400));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    bananasGroup.add(banana);
    banana.lifetime = 97;
  }
  
}


function spawnObstacles(){
  
  if (frameCount % 80 === 0){
    var rock = createSprite(600,175,20,20);
    rock.velocityX = -(6+score/10);
    rock.addImage(rockImage);
    rock.scale = 0.1;
    rocksGroup.add(rock);
    rock.lifetime = 97;
  }
  
}

function spawnBigbananas(){
  if (frameCount % 200 === 0){
    var bigbanana = createSprite(50,50,20,20);
    bigbanana.addImage(bigbananaImage);
    bigbanana.scale = 0.1;
    bigbanana.x = Math.round(random(600,600));
    bigbanana.velocityX = -6;
    bigbanana.lifetime = 97;
    bigbananasGroup.add(bigbanana);
  }
}

