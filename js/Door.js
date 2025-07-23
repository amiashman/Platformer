// This class, called Door, represents a door in the game that can be used to transition between different screens or levels. It should appear in the game as a tan rectangle that the player can interact with to change screens. When the player collides (i.e. completely overlaps) with the door, it should trigger a screen change to the next screen in the game.
class Door {
  constructor(x, y, targetScreenCode) {
    this.x = x; // X position of the door
    this.y = y; // Y position of the door
    this.width = playerWidth; // Width of the door, matching player width
    this.height = playerHeight; // Height of the door, matching player height
    this.targetScreenCode = targetScreenCode; // The screen to transition to when the player interacts with the door
    this.color = "#D2B48C"; // Color of the door (tan)
    this.locked = false; // Flag to check if the door is locked
  }

  checkPlayerCollision(player) {
    // Check if player is colliding with the door
    if (Math.abs(player.x - this.x) < player.speed && player.y == this.y) {
      // Player is colliding with the door, trigger screen change
      if (this.locked) {
        if (player.hasItem(Key)) {
          this.locked = false; // Unlock the door if player has a key
        } else {
          return; // Exit if the door is locked
        }
      }
      for (let screen of allScreens) {
        if (screen.getCode() === this.targetScreenCode) {
          currentScreen = screen; // Change to the target screen
          break;
        }
      }
      player.setCurrentScreen(currentScreen); // Update player's current screen
    }
  }

  display() {
    // Scale all measurements relative to size (30x40 base dimensions)
    let scaleX = this.width / 30; // Width scaling
    let scaleY = this.height / 40; // Height scaling
    let scale = min(scaleX, scaleY); // Use uniform scaling for consistency

    let doorWidth = 30 * scale;
    let doorHeight = 40 * scale;

    // Main door body
    stroke(120, 80, 60);
    fill(160, 110, 80); // Medium brown wood
    rect(this.x, this.y, doorWidth, doorHeight, 2 * scale);

    // Wood grain lines (horizontal)
    stroke(140, 95, 70);
    strokeWeight(max(1, scale * 0.5));
    for (let i = 2; i < 8; i++) {
      line(
        this.x + 2 * scale,
        this.y + i * 5 * scale,
        this.x + doorWidth - 2 * scale,
        this.y + i * 5 * scale
      );
    }

    // Door panels (raised rectangles)
    stroke(180, 130, 100);
    fill(180, 125, 90); // Lighter wood for panels
    strokeWeight(max(1, scale));

    // Upper panel
    rect(
      this.x + 4 * scale,
      this.y + 4 * scale,
      doorWidth - 8 * scale,
      12 * scale,
      1 * scale
    );
    // Lower panel
    rect(
      this.x + 4 * scale,
      this.y + 20 * scale,
      doorWidth - 8 * scale,
      16 * scale,
      1 * scale
    );

    // Panel inner details
    stroke(140, 95, 70);
    strokeWeight(max(1, scale * 0.3));
    noFill();
    rect(
      this.x + 6 * scale,
      this.y + 6 * scale,
      doorWidth - 12 * scale,
      8 * scale
    );
    rect(
      this.x + 6 * scale,
      this.y + 22 * scale,
      doorWidth - 12 * scale,
      12 * scale
    );

    // Door handle/knob
    stroke(100);
    fill(200, 180, 120); // Brass/gold handle
    ellipse(
      this.x + doorWidth - 6 * scale,
      this.y + 20 * scale,
      3 * scale,
      3 * scale
    );

    // Handle highlight
    stroke(255, 230, 150);
    strokeWeight(max(1, scale * 0.5));
    point(this.x + doorWidth - 7 * scale, this.y + 19 * scale);

    // Door frame (top and sides only - no bottom frame)
    stroke(100, 70, 50);
    strokeWeight(max(2, scale));
    noFill();
    // Top frame
    line(
      this.x - 1 * scale,
      this.y - 1 * scale,
      this.x + doorWidth + 1 * scale,
      this.y - 1 * scale
    );
    // Left frame
    line(
      this.x - 1 * scale,
      this.y - 1 * scale,
      this.x - 1 * scale,
      this.y + doorHeight
    );
    // Right frame
    line(
      this.x + doorWidth + 1 * scale,
      this.y - 1 * scale,
      this.x + doorWidth + 1 * scale,
      this.y + doorHeight
    );

    // Keyhole
    stroke(60);
    fill(40, 30, 20);
    ellipse(
      this.x + doorWidth - 6 * scale,
      this.y + 22 * scale,
      1.5 * scale,
      1.5 * scale
    );
  }
}
