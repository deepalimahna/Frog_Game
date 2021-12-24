var oceanImg, ocean;
var coinImg, coin, coinGroup;
var climberImg, climber, climbersGroup;
var frog, frogImg;
var play = 1;
var end = 0;
var gameState = "play";
var score = 0;

function preload(){
  oceanImg = loadImage("water.jpg");
  coinImg = loadImage("coin.png");
  climberImg = loadImage("seaweed.png");
  frogImg = loadImage("frog.png");
  
}

function setup(){
  createCanvas(580,450);
  
  ocean = createSprite(300,300);
  ocean.addImage("ocean",oceanImg);
  
  frog = createSprite(200,200,50,50);
  frog.scale = 0.1;
  frog.addImage("frog", frogImg);  
  
  //create coin group and climber group
  coinGroup = new Group();

  climbersGroup = new Group();
  
  score = 0;

  frog.setCollider("rectangle",0,0,400,400);
}

function draw(){
  
  //background(0);

  background(oceanImg);
  drawSprites();
  
  
  
  frog.setVelocity(0,0);
  if (gameState === "play") {

  ocean.setVelocity(0,2);
  fill("black");
  textSize(20);
  text("Score: "+ score, 300,50);
  //drawSprites();
  spawnCoin();

  if(keyDown("space")){

    frog.setVelocity(0,-3);
  }

  /*if(keyDown("space") && frog.position.y < 740){
    frog.setVelocity(0,-2);
  }*/

 
    
  if(climbersGroup.isTouching(frog)){
      frog.setVelocity(0,0);
      gameState = END;
  }

  if(coinGroup.isTouching(frog)){
    score=score+1;
  }
}
  if(gameState === end){
   
    frog.setVelocity(0,0);
   
    coinGroup.destroyEach();
    climbersGroup.destroyEach();
    
    fill("black");
    textSize(20);
    text("Game Over");
  
    
  }
  
 
 //infinite background  
 if(ocean.position.y > 300){
    ocean.position.y = 40;
    }
}

// create the coin and climber in the same function
function spawnCoin(){
  
  if (frameCount % 280 === 0) {
      //drawSprites();
      climber = createSprite(Math.round(random(10,750)),80,200,50);
      climber.addImage("climber",climberImg);
      climber.setVelocity(-3,0);
      climber.setVisible=true;
      climber.scale = 0.5;
      climber.lifetime = 160;
      
      climbersGroup.add(climber);
  
      coin = createSprite(climber.x,90,20,20);
      coin.addImage("coin falling",coinImg);
      coin.setVelocity(0,3);
      
      coin.scale = 0.1;
      
      coin.lifetime = 60;
      
      coinGroup.add(coin);
     
   
  }
}

