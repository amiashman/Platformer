// This class represents an item in the game, such as a coin, a power-up, a collectible, etc.
class Item {
  constructor(x, y, width, height) {
    this.x = x; // X position of the item
    this.y = y; // Y position of the item
    this.width = width; // Width of the item
    this.height = height; // Height of the item
    this.collected = false; // Flag to check if the item has been collected
  }

  checkPlayerCollision(player) {
    // Check if player is colliding with the item
    if (
      !this.collected &&
      player.x < this.x + this.width &&
      player.x + player.width > this.x &&
      player.y < this.y + this.height &&
      player.y + player.height > this.y
    ) {
      // Player has collided the item
      this.performEffect();
    }
  }

  performEffect() {
    // This method should be overridden in subclasses to define the item's effect
  }

  display() {
    // This method should be overridden in subclasses to define the item's apprearance
  }
}
