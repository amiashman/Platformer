// This item will represent a poison in the game. It should appear as a small vial of purple poison that the player can collect to decrease their health. When the player collides with the poison, it should disappear and reduce the player's health by 1.
class Poison extends Item {
  constructor(x, y) {
    super(x, y, 10, 10); // Call the parent constructor with width and height
    this.color = "#800080"; // Color of the poison (purple)
    this.collected = false; // Flag to check if the poison has been collected
  }

  performEffect() {
    player.inflictDamage(1); // Decrease player's health by 1
    this.collected = true; // Mark the poison as collected
  }

  display() {
    // Draw the poison as a purple circle
    if (!this.collected) {
      // Draw the poison vial
      let scale = this.width / 10;

      // Vial body (glass bottle)
      stroke(100);
      fill(220, 220, 255, 100); // Semi-transparent glass
      rect(
        this.x + 6 * scale,
        this.y + 4 * scale,
        8 * scale,
        14 * scale,
        1 * scale
      ); // Main bottle body

      // Vial neck
      fill(200, 200, 240, 120);
      rect(this.x + 8 * scale, this.y + 2 * scale, 4 * scale, 3 * scale);

      // Cork/stopper
      fill(139, 69, 19); // Brown cork
      rect(
        this.x + 7 * scale,
        this.y + 1 * scale,
        6 * scale,
        2 * scale,
        1 * scale
      );

      // Purple liquid
      fill(147, 112, 219); // Medium purple
      rect(this.x + 7 * scale, this.y + 12 * scale, 6 * scale, 5 * scale); // Bottom portion

      // Liquid surface highlight
      stroke(186, 164, 235); // Lighter purple
      line(
        this.x + 7 * scale,
        this.y + 12 * scale,
        this.x + 12 * scale,
        this.y + 12 * scale
      );

      // Glass shine
      stroke(255);
      strokeWeight(max(1, scale));
      line(
        this.x + 7 * scale,
        this.y + 5 * scale,
        this.x + 7 * scale,
        this.y + 15 * scale
      ); // Left shine
      point(this.x + 9 * scale, this.y + 6 * scale); // Small highlight

      // Vial outline
      stroke(80);
      strokeWeight(max(1, scale));
      noFill();
      rect(
        this.x + 6 * scale,
        this.y + 4 * scale,
        8 * scale,
        14 * scale,
        1 * scale
      );
    }
  }
}
