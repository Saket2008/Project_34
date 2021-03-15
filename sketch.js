var dog
var dogImg, happyDogImg
var database
var foodS
var foodStock
var din, days;

function preload()
{
	dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  
  database = firebase.database();
  dog = createSprite(250, 250);
  dog.addImage(dogImg);
  dog.scale = 0.2

  foodStock = database.ref('DogFood');
  foodStock.on("value", readStock);

  din = database.ref('Days');
  din.on("value", readDays);
}


function draw() 
{  
  background(46, 139, 87);

  if(keyWentDown("space") && foodS > 0)
  {
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }

  if(frameCount % 200 === 0)
  {
    dog.addImage(dogImg);
    writeDays(days);
  }
  
  drawSprites();

  textSize(20);
  fill("red");
  text("Doodh Remaining:- " + foodS, 150, 160);
  text("Day:- " + days, 220, 130);
  fill("yellow");
  text("Note: Press Space Bar key to feed your TOMMY!!", 30, 50);
}

function readStock(data)
{
  foodS = data.val();
}

function readDays(data)
{
  days = data.val();
}

function writeStock(x)
{
  if(x > 0)
  {
    x = x - 1;
  }

  database.ref('/').update({
    DogFood: x
  })
}

function writeDays(y)
{
  y++

  database.ref('/').update({
    Days: y
  })
}