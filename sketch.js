  var PLAY = 1;
  var END = 0;
  var START = 2;
  var gameState = 2;
  var monkey , monkey_running;
  var banana ,bananaImage,  obstacle,  obstacleImage;
  var foodGroup, obstacleGroup;
  var ground,  invisibleGround,  jungleImage;
  var score,  c,  restart,  restartImage;
  var team,  teamImage;
  var gorilla,  startImage;
  var gameOver,  gameOverimage;
  var fail,  jump,  but;



function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
  jungleImage = loadImage("jungle.jpg");
  
  gameOverImage = loadImage("gameover.png");
  
  teamImage = loadImage("panda.png");
  startImage = loadImage("gorilla.png");
  
  restartImage = loadImage("restart.png");
  
  fail = loadSound("Fail.mp3");
  jump = loadSound("jump.mp3");
  but = loadSound("Right.mp3");
}


function setup() {
  
  createCanvas(600,400);
  
  monkey = createSprite(50,305,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.12;
  
  ground = createSprite(10,40,800,200);
  ground.addImage("ground",jungleImage);
  ground.scale = 1.5; 
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,345,800,20);
  
  team = createSprite(20,20,30,30);
  team.addImage("team",teamImage);
  team.scale = 0.008;
  
  gorilla = createSprite(300,200,400,400);
  
  restart = createSprite(300,350,50,50);
  restart.addImage("restart",restartImage);
  
  gameOver = createSprite(300,200,100,100);
  gameOver.addImage("over",gameOverImage);
  gameOver.scale = 0.3;
  
  obstacleGroup = new Group();
  foodGroup = new Group();
  
  score = 0;
  c = 0;
}


function draw() {
  background("white"); 
  
  //monkey.debug = true;
  //console.log(frameCount);
  if(gameState === START){
    background("pink");
   
   
    
    gorilla.addImage("game",startImage);
    gorilla.scale = 0.04;
    monkey.visible = false;
    invisibleGround.visible = false;
    ground.visible = false;
    restart.visible = false;
    gameOver.visible = false;
    
    textSize(48);
    fill("red");
    textFont("Didot");
    text("GORILLA RUSH",120,350);
    
    textSize(12);
    fill("green");
    textFont("Cambria");
    text("Press right arrow to continue...",250,380);
    
    textSize(10);
    fill("black");
    textFont("Cambria");
    text("HINT:Press 'space' to jump",250,395);
     
    if(keyDown("right")){
       gameState = PLAY;
       
       }
   }
  
  
  else if(gameState === PLAY){
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 250) {
      monkey.velocityY = -12;
      jump.play();  
    }
    
  //add gravity
  monkey.velocityY = monkey.velocityY + 0.8;
  
  spawnObstacles();
  spawnFood();
  monkey.depth = ground.depth +1;
  
  invisibleGround.visible = false;
  monkey.visible = true;
  gorilla.visible = false;
  ground.visible = true;
  monkey.collide(invisibleGround);
  
    
  if(obstacleGroup.isTouching(monkey)){
     gameState = END;
     fail.play();
  }
  
  if(foodGroup.isTouching(monkey)){
    c = c + 1 ;
    foodGroup.destroyEach();
     
  }
    
    score = score + Math.round(getFrameRate()/60);
   
   if(score>0 && score%100 === 0){
   but.play();
   }
}
  
  else if(gameState === END){
    
    gameOver.visible = true;
    ground.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    obstacleGroup.destroyEach();
    foodGroup.destroyEach();
    restart.visible = true; 
    monkey.visible = false;
      
    if(mousePressedOver(restart)){
       reset();      
       }
  }
 
  
    
  drawSprites();
   
  
  
  textSize(10);
  fill("black");
  textFont("Garamond");
  text("PANDA GAMING",45,10);
  
  //displaying score
  textSize(18);
  fill("black");
  text("Survival Time: "+ score, 100,50);
  
  textSize(18);
  fill("blue");
  text("Banana Collected: "+ c,320,50);
  

}
  


function spawnObstacles(){
  if (frameCount % 300 === 0){
    
   obstacle = createSprite(600,300,10,40);
   obstacle.addImage("stone",obstacleImage);
   obstacle.velocityX = -(6+(score/100));
   obstacle.x = Math.round(random(400,600));
   obstacle.scale = 0.16;
   
   //obstacle.debug = true;
   obstacle.setCollider("circle",0,0,150);
   obstacle.depth = ground.depth;
   obstacle.depth = ground.depth +1;
    
   obstacleGroup.add(obstacle);
   obstacle.lifetime = 100;

  }
     
}
function spawnFood(){
  if(frameCount % 80 === 0){
     banana = createSprite(700,200,40,40);
     banana.addImage("food",bananaImage);
     banana.velocityX = -(7+(score/100));
     banana.y = Math.round(random(200,300));
     banana.scale = 0.1;
     banana.lifetime = 100;
    
     banana.depth = ground.depth;
     banana.depth = ground.depth +1;
     
     foodGroup.add(banana);
  }

}
function reset(){

  gameState = 1;
  
  monkey.changeAnimation("running",monkey_running);
  
  gameOver.visible = false;
  restart.visible = false;
  
  foodGroup.destroyEach();
  obstacleGroup.destroyEach();
  
  
  if (ground.x < 0){
      ground.x = ground.width/2;
  }
  ground.velocityX = -4;
  
  
  
  score = 0;
  c = 0;
}

