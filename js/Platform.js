// Platform class
class Platform {
  constructor(x, y, width, height, spiked = false) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.spiked = spiked; // Whether this platform has spikes
    this.color = spiked ? "#8b0000" : "#ff0000"; // Dark red if spiked, normal red if not
    this.velocityX = 0; // Track platform's horizontal movement
    this.velocityY = 0; // Track platform's vertical movement
    this.spikeColor = "#666666"; // Gray spikes
    this.spikeHeight = 8; // Height of the spikes
  }

  update() {
    // Base platform doesn't move - override in subclasses for movement
    this.velocityX = 0;
    this.velocityY = 0;
  }

  // Check if this platform is colliding with the player and push if needed
  checkPlayerCollision(player) {
    // Check if platform overlaps with player
    if (
      this.x < player.x + player.width &&
      this.x + this.width > player.x &&
      this.y < player.y + player.height &&
      this.y + this.height > player.y
    ) {
      // Only push if the player is not standing on top of this platform
      // (standing on top means player's bottom is at or above platform's top)
      if (player.y + player.height > this.y + 5) {
        // 5 pixel tolerance for "on top"

        // Calculate push direction based on platform movement
        if (this.velocityX > 0) {
          // Platform moving right, push player right
          player.x = this.x + this.width;
        } else if (this.velocityX < 0) {
          // Platform moving left, push player left
          player.x = this.x - player.width;
        } else {
          // Stationary platform or vertical movement
          // Push player to the side with less overlap
          let overlapLeft = player.x + player.width - this.x;
          let overlapRight = this.x + this.width - player.x;

          if (overlapLeft < overlapRight) {
            // Less overlap on left, push left
            player.x = this.x - player.width;
          } else {
            // Less overlap on right, push right
            player.x = this.x + this.width;
          }
        }

        // // Ensure player stays within canvas bounds
        // player.x = constrain(player.x, 0, width - player.width);
      }
    }

    // Check for spike damage if this platform is spiked
    if (this.spiked) {
      this.checkSpikeDamage(player);
    }
  }

  checkSpikeDamage(player) {
    // Check if player is on top of this spiked platform
    if (
      player.x < this.x + this.width &&
      player.x + player.width > this.x &&
      Math.abs(player.y + player.height - this.y) < 3 && // Player is on top
      player.standingOnPlatform === this
    ) {
      // Player is standing on this platform

      // Call the player's inflictDamage method
      player.inflictDamage();
    }
  }

  display() {
    // Draw the platform base
    fill(this.color);
    noStroke();
    rect(this.x, this.y, this.width, this.height);

    // Draw spikes if this platform is spiked
    if (this.spiked) {
      fill(this.spikeColor);
      let spikeWidth = 6;
      let numSpikes = Math.floor(this.width / spikeWidth);

      for (let i = 0; i < numSpikes; i++) {
        let spikeX = this.x + i * spikeWidth;
        // Draw triangle spike
        triangle(
          spikeX,
          this.y,
          spikeX + spikeWidth / 2,
          this.y - this.spikeHeight,
          spikeX + spikeWidth,
          this.y
        );
      }
    }
  }
}
