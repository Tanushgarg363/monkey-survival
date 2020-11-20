var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstaclesGroup,bananaGroup;
var ground,background;
var jungleImage;
var survivalTime=0;
var score=0;
var PLAY;
var gameState=PLAY;

var END = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  jungleImage=loadImage("jungle.jpg")

 
}



function setup() {
 // background(0,0,0,0)
  createCanvas(400,400)
  
  background=createSprite(0,0)
  background.addImage(jungleImage)
  background.scale=1.0
  background.velocityX=-4
  
 
  
  monkey=createSprite(50,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.2;
  
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.visible=false
  
  
  obstaclesGroup = new Group();
  bananaGroup = new Group(); 
  
  survivalTime=0

  
}


function draw() {
 
  
  
  
  
 
    

  ground.velocityX=-4
  
  if (ground.x < 0){
    console.log(ground.x)
      ground.x = ground.width/2;
    }
  monkey.collide(ground);
  
  if(keyDown("space") && monkey.y >= 159) {
      monkey.velocityY = -12;
    }
 monkey.velocityY = monkey.velocityY + 0.8
  
  if(background.x<0) {
    
    background.x=background.width/2
  }
  
  if (bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach()
    
  }
  
  if(obstaclesGroup.isTouching(monkey)){
      monkey.scale=0.15
   }
  
  
  if( obstaclesGroup.isTouching(monkey) && monkey.scale===0.15){
      
      gameState=END;
    }
  
  if (gameState===END){
    
    text("gameover",300,100)
    
  }
  
  
  obstacle()
  food()
  
  drawSprites()
  
  
  stroke("black")
  textSize(20)
  fill("white")
  survivalTime=Math.ceil(frameCount/frameRate())  
  text("survival time: " + survivalTime ,50,50)
 
  
}

function food(){
  if (frameCount % 80 === 0) {
    var banana = createSprite(200,120);
    banana.y = Math.round(random(120,200));
   banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    bananaGroup.add(banana)
    banana.lifetime=200;
  } 
 
  
}

function obstacle()
{
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(200,330,40,10);
    
   obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -5;
    obstaclesGroup.add(obstacle)
    obstacle.lifetime=200;
    
    
    
    
    
  }
  
  
  
}


switch(survivalTime){
    
  case 10:monkey.scale=0.4
    break;
    case 20:monkey.scale=0.5
    break;
     case 30:monkey.scale=0.6
    break;
     case 40:monkey.scale=0.7
    break;
    default: break;
}
