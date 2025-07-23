// This class represents a key item in the game, which can be used to unlock doors.
class Key extends Item {
  constructor(x, y) {
    super(x, y, 10, 10); // Call the parent constructor with width and height
    this.color = "#3C4142"; // Color of the key (dark gray)
    this.collected = false; // Flag to check if the key has been collected
  }

  performEffect() {
    player.collectItem(this); // Add the key to the player's inventory
    this.collected = true; // Mark the key as collected
  }

  display() {
    if (!this.collected) {
      fill(this.color);
      noStroke();
      ellipse(
        this.x + this.width / 2,
        this.y + this.height / 2,
        this.width * 2
      );
    }
  }
}
