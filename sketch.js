var backImage, edges;
var eggImage, penguinImage, realPenguin, penguinLeft, penguinRight;
var penguin;
var whale, whaleImage, whaleGroup;
var iceberg, icebergImage, icebergGroup;
var food, foodImage, foodGroup;
var startButton, restartButton;
var title = 'The emperor penguins chicks are finally old enough to go look for food themselves. Make sure that none of the penguins get caught by the orca whales!'
var gameState = 0;
var score = 0;

function preload() {
  backImage = loadImage('images/Water background.jpg');

  eggImage = loadImage('images/Penguin Birth (1).png');
  penguinImage = loadImage('images/Penguin Birth (2).png');
  realPenguin = loadImage('images/Walking backwards.png');

  penguinLeft = loadImage('images/Pen Left.png')
  penguinRight = loadImage('images/Pen Right.png')

  whaleImage = loadImage('images/KillerWhale .png')

  icebergImage = loadImage('images/Iceberg.png')

  foodImage = loadImage('images/Krill.png')
}
function setup() {
  createCanvas(1450,1000);

  penguin = createSprite(windowWidth/ 2, windowHeight /2);
  penguin.addImage(eggImage);

  whaleGroup = createGroup()

  icebergGroup = createGroup()

  foodGroup = createGroup()

  startButton = createButton('Start!');
  startButton.position(windowWidth/2 - 50, windowHeight - 50);
  startButton.style('font-size', '30px');
  startButton.style('background-color', 'orange');
  startButton.style('font-weight', 'bold');
  startButton.style('border-radius', '5px');

  restartButton = createButton('Restart!')
  restartButton.visible = false
  restartButton.position(windowWidth/2 - 50, windowHeight - 50);
  restartButton.style('font-size', '30px');
  restartButton.style('background-color', 'orange');
  restartButton.style('font-weight', 'bold');
  restartButton.style('border-radius', '5px');
}
function draw() {
  background(backImage);

  if (gameState == 0) {
    textSize(18)
    textStyle('bold')
    text(title)
    if (mousePressedOver(penguin)) {
      penguin.addImage(penguinImage);
      gameState = 1;
    }
    startButton.mousePressed(function () {
      startButton.hide();
      penguin.addImage(realPenguin);
      penguin.scale = 0.25;
      gameState = 1;
    });
  }
  if (gameState == 1) {
    edges = createEdgeSprites();
    penguin.bounceOff(edges);
    spawnWhales()
    spawnIcebergs()
    spawnFood()

    text("Score: " + score)

    if (keyDown(UP_ARROW)) {
      penguin.y = penguin.y - 20;
      penguin.addImage(realPenguin)
      penguin.scale = 0.25;
    }
    if (keyDown(DOWN_ARROW)) {
      penguin.y = penguin.y + 20;
      penguin.addImage(realPenguin)
      penguin.scale = 0.25;
    }
    if (keyDown(RIGHT_ARROW)) {
      penguin.x = penguin.x + 20;
      penguin.addImage(penguinRight)
      penguin.scale = 0.8;
    }
    if (keyDown(LEFT_ARROW)) {
      penguin.x = penguin.x - 20;
      penguin.addImage(penguinLeft)
      penguin.scale = 0.5;
    }

    if(penguin.isTouching(whaleGroup)) {
      whaleGroup.destroyEach()
      gameState = 2
    } else if (penguin.isTouching(icebergGroup)) {
      icebergGroup.destroyEach()
      gameState = 2
    }

    if(penguin.isTocuhing(foodGroup)) {
      score = score + 1
      foodGroup.destroyEach()
    }
  }
  if(gameState == 2) {
    restartButton.visibile = true
    restartButton.mousePressed(function() {
      gameState = 0
    })
  }

  drawSprites();
}

function spawnWhales () {
  if(frameCount % 60 == 0) {
    var x = Math.random(10, 1300)
    var y = Math.random(10, 900)

    whale = createSprite(x, y)
    whale.addImage(whaleImage)
    whale.scale = 0.3
    whale.lifetime = 70

    whaleGroup.add(whale)
  }
}

function spawnIcebergs () {
  if(frameCount % 60 == 0) {
    var x = Math.random(10, 1300)
    var y = Math.random(10, 900)

    iceberg = createSprite(x, y)
    iceberg.addImage(icebergImage)
    iceberg.lifetime = 70

    icebergGroup.add(iceberg)
  }
}

function spawnFood () {
  if(frameCount % 60 == 0) {
    var x = Math.random(10, 1300)
    var y = Math.random(10, 900)

    food = createSprite(x, y)
    food.addImage(foodImage)
    food.scale = 0.3
    food.lifetime = 70

    foodGroup.add(food)
  }
}
