// This class, called coin, represents a collectible coin in the game. It should appear as a small yellow circle that the player can collect to increase their score. When the player collides with the coin, it should disappear and add to the player's score.
class Coin extends Item {
  constructor(x, y) {
    super(x, y, 10, 10); // Call the parent constructor
    this.color = "#FFD700"; // Color of the coin (gold)
    this.collected = false; // Flag to check if the coin has been collected
  }

  performEffect() {
    score += 1; // Increase player's score
    this.collected = true; // Mark the coin as collected
  }

  display() {
    // Draw the coin as a yellow circle
    if (!this.collected) {
      // Scale all measurements relative to size
      let scale = this.width / 10;
      let centerX = this.x + 10 * scale;
      let centerY = this.y + 10 * scale;
      let radius = 8 * scale;

      // Coin shadow/base
      stroke(100);
      fill(150, 120, 60); // Dark gold
      ellipse(centerX, centerY, radius * 2, radius * 2);

      // Main coin body
      stroke(180, 150, 80);
      fill(220, 185, 100); // Gold color
      ellipse(centerX, centerY, (radius - 1) * 2, (radius - 1) * 2);

      // Inner circle detail
      stroke(200, 165, 90);
      strokeWeight(max(1, scale * 0.5));
      noFill();
      ellipse(centerX, centerY, (radius - 3) * 2, (radius - 3) * 2);

      // Center dot/symbol
      stroke(180, 150, 80);
      strokeWeight(max(1, scale));
      fill(200, 165, 90);
      ellipse(centerX, centerY, 2 * scale, 2 * scale);

      // Highlight shine
      stroke(255, 230, 150);
      strokeWeight(max(1, scale * 0.5));
      // Top-left highlight arc
      noFill();
      arc(
        centerX - 2 * scale,
        centerY - 2 * scale,
        4 * scale,
        4 * scale,
        PI,
        PI + HALF_PI
      );

      // Edge details (small notches)
      stroke(160, 130, 70);
      strokeWeight(max(1, scale * 0.3));
      for (let i = 0; i < 8; i++) {
        let angle = (i * PI) / 4;
        let x1 = centerX + cos(angle) * (radius - 1);
        let y1 = centerY + sin(angle) * (radius - 1);
        let x2 = centerX + cos(angle) * radius;
        let y2 = centerY + sin(angle) * radius;
        line(x1, y1, x2, y2);
      }
    }
  }
}
