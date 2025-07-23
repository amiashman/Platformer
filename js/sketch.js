let camera; // Camera object to handle following the player
let player; // Player object representing the player character
const playerWidth = 30; // Player width
const playerHeight = 40; // Player height
let currentScreen; // Current screen the player is on
let worldWidth = 600; // Width of the game world
let worldHeight = 600; // Height of the game world
let gameStartTime; // When the game started (in milliseconds)
let score = 0; // Player's score
let maxHealth = 3; // Player's maximum health
const allScreens = []; // Array to hold all screens

function setup() {
  // Create canvas
  let canvas = createCanvas(600, 600);
  canvas.parent("game-container");

  camera = new Camera(); // Initialize camera

  // Initialize game timer
  gameStartTime = millis(); // p5.js function that returns milliseconds since program start

  // Initialize player at bottom of canvas
  player = new Player(50, height - playerHeight, playerWidth, playerHeight);

  // Generate screens from the SCREEN_CODES array
  for (let i = 0; i < SCREEN_CODES.length; i++) {
    allScreens[i] = Screen.generate(SCREEN_CODES[i]);
  }

  currentScreen = allScreens[0]; // Set the first screen as the current screen
  worldWidth = currentScreen.getWidth(); // Set world width based on the first screen
  worldHeight = currentScreen.getHeight(); // Set world height based on the first screen

  // Set the current screen for the player
  player.setCurrentScreen(currentScreen);
}

function draw() {
  player.update(); // Update player position and state
  if (currentScreen) {
    currentScreen.update(); // Update current screen state
  }

  camera.follow(player, worldWidth, height); // Update camera to follow player
  camera.apply(); // Apply camera transformation before drawing

  if (currentScreen) {
    currentScreen.display(); // Draw the current screen
    currentScreen.checkCollisions(player); // Check for collisions with items and platforms
  }

  player.display(); // Draw the player

  camera.reset(); // Reset camera transformation for UI

  // Draw UI elements
  drawScore();
  drawHealth();
  drawTimer();
}

function drawScore() {
  // Set text properties
  fill("#ffffff");
  textAlign(LEFT, TOP);
  textSize(20);
  textFont("Arial");

  // Draw score in top left corner with some padding from the edge
  text("Score: " + score, 10, 10);
}

function drawHealth() {
  // Draw hearts in the center top of the screen
  let heartSize = 20;
  let heartSpacing = 28;
  let totalWidth = maxHealth * heartSpacing - (heartSpacing - heartSize); // Calculate total width needed
  let startX = (width - totalWidth) / 2; // Center the hearts
  let y = 20; // Y position aligned with text baseline

  // Draw each heart based on maxHealth
  for (let i = 0; i < maxHealth; i++) {
    let x = startX + i * heartSpacing;
    drawHeart(x, y, heartSize, i < player.health ? true : false);
  }
}

function drawHeart(x, y, size, filled) {
  // Improved heart shape using bezier curves for a more heart-like appearance
  push(); // Save current drawing state
  translate(x, y);

  if (filled) {
    fill("#ff0000"); // Red for filled hearts
    noStroke();
  } else {
    noFill();
    stroke("#ff0000"); // Red outline for empty hearts
    strokeWeight(2);
  }

  // Draw heart shape using beginShape and bezier curves
  beginShape();
  vertex(0, size / 4); // Bottom point of heart

  // Left side of heart
  bezierVertex(
    -size / 2,
    -size / 4,
    -size / 2,
    -size / 2,
    -size / 4,
    -size / 2
  );
  bezierVertex(-size / 8, -size / 2, 0, -size / 3, 0, -size / 4);

  // Right side of heart
  bezierVertex(0, -size / 3, size / 8, -size / 2, size / 4, -size / 2);
  bezierVertex(size / 2, -size / 2, size / 2, -size / 4, 0, size / 4);

  endShape(CLOSE);

  pop(); // Restore drawing state
}

function drawTimer() {
  // Update game time based on actual elapsed time
  gameTime = (millis() - gameStartTime) / 1000; // Convert milliseconds to seconds
  // Format time as MM:SS
  let minutes = Math.floor(gameTime / 60);
  let seconds = Math.floor(gameTime % 60);
  let timeString =
    String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");

  // Set text properties
  fill("#ffffff");
  textAlign(RIGHT, TOP);
  textSize(20);
  textFont("Arial");

  // Draw time with some padding from the edge
  text(timeString, width - 10, 10);
}
