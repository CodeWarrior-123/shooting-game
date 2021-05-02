var score = 0
var bulletGroup, ufoGroup;
var health = 100;

function preload() {
  ufoImage = loadImage("Images/ufo.jpg")
  rocketImage = loadImage("Images/rocket.jpg")
  backgroundImage = loadImage("Images/baground.png")
  fireImage = loadImage("Images/fire.png")
}

function setup() {
  createCanvas(600, 600);

  bulletGroup = new Group()
  ufoGroup = new Group()
  shotData = [false, 0];

  rocket = createSprite(300, 550, 20, 50);
  rocket.addImage(rocketImage)
  rocket.scale = 0.1;

}

function draw() {

  background(backgroundImage);
  text("SCORE: " + score, 500, 30)

  if (keyDown("left")) {
    rocket.x = rocket.x - 6
  }

  if (keyDown("right")) {
    rocket.x = rocket.x + 6
  }

  shooting()
  generateUFO()

  bulletGroup.collide(ufoGroup, removeUfo)


  if (ufoGroup.isTouching(rocket)) {
    health -= 1;
  }
  if (health <= 0) {
    text("GAME OVER", 200, 200)
  }

  /*  for (var x = 0; x < bulletGroup.length; x++) {
    for (var y = 0; y < ufoGroup.length; y++) {
      console.log(bulletGroup.length);
      if (bulletGroup.get(x).collide(ufoGroup.get(y))) {
        ufoGroup.get(y).destroy();
        bulletGroup.get(x).destroy();
        score += 100;
      }
    }
  } */

  drawSprites();

}

function generateUFO() {

  if (frameCount % 30 === 0) {
    ufo = createSprite(Math.round(random(10, 580)), 20, 20, 20)
    ufo.addImage(ufoImage)
    ufo.scale = 0.2
    ufo.velocityY = 3
    ufoGroup.add(ufo)
  }
}


function shooting() {
  if (keyDown("up")) {
    bullet = createSprite(rocket.x, rocket.y, 50, 50)
    bullet.addImage("fire", fireImage)
    bullet.scale = 0.05
    //bullet.visible = true
    bullet.velocityY = -5
    bulletGroup.add(bullet)
    //bullet.lifetime = 200

  }
}

function removeUfo(bulletGroup, ufoGroup) {
  ufoGroup.remove();
  bulletGroup.remove();
}




