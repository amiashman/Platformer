// Player class
class Player {
  constructor(x, y, playerWidth, playerHeight) {
    this.x = x; // Player x position
    this.y = y; // Player y position
    this.width = playerWidth; // Player width
    this.height = playerHeight; // Player height
    this.color = "#ffffff"; // White
    this.flashingColor = "#808080"; // Gray for invincibility flashing
    this.speed = 5; // Movement speed
    this.velocityY = 0; // Vertical velocity
    this.gravity = 0.8; // Gravity force
    this.jumpPower = -12; // Jump strength
    this.groundY = height - this.height; // Ground level
    this.isGrounded = true; // Whether player is on the ground
    this.standingOnPlatform = null; // Track which platform player is standing on
    this.currentScreen = null; // Reference to current screen
    this.health = maxHealth; // Player's health
    this.isInvincible = false; // Whether player is currently invincible
    this.invincibilityDuration = 3; // Duration of invincibility in seconds
    this.inventory = []; // Player's inventory for items
  }

  setCurrentScreen(screen) {
    this.currentScreen = screen;
    worldWidth = screen.getWidth(); // Update world width based on screen
    worldHeight = screen.getHeight(); // Update world height based on screen
    // Clear any previous platform reference
    this.standingOnPlatform = null;
    this.isGrounded = false;
  }

  collectItem(item) {
    this.inventory.push(item); // Add item to inventory
  }

  hasItem(itemType) {
    // Check if player has an item of a specific type in their inventory
    return this.inventory.some((item) => item instanceof itemType);
  }

  update() {
    // Store original position
    let originalX = this.x;

    // Handle left and right movement
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.speed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.speed;
    }

    // Check horizontal collisions and revert if needed
    if (this.currentScreen) {
      for (let platform of this.currentScreen.getPlatforms()) {
        if (
          this.x < platform.x + platform.width &&
          this.x + this.width > platform.x &&
          this.y < platform.y + platform.height &&
          this.y + this.height > platform.y
        ) {
          // Collision detected, revert horizontal movement
          this.x = originalX;
          break;
        }
      }
    }

    // Handle jumping
    if (keyIsDown(UP_ARROW) && this.isGrounded) {
      this.velocityY = this.jumpPower;
      this.isGrounded = false;
      this.standingOnPlatform = null; // No longer standing on platform when jumping
    }

    // Apply gravity
    this.velocityY += this.gravity;

    // Store position before vertical movement
    let oldY = this.y;

    // Check if we're currently standing on a platform before applying gravity
    let currentPlatform = null;
    if (this.currentScreen) {
      for (let platform of this.currentScreen.getPlatforms()) {
        if (
          this.x < platform.x + platform.width &&
          this.x + this.width > platform.x &&
          Math.abs(this.y + this.height - platform.y) < 2
        ) {
          // Small tolerance for floating point errors
          currentPlatform = platform;
          break;
        }
      }
    }

    // If we're standing on a platform, move with it first
    if (currentPlatform) {
      this.x += currentPlatform.velocityX;
      this.y += currentPlatform.velocityY;
      this.standingOnPlatform = currentPlatform;

      // Only set grounded and reset velocity if we're not jumping
      if (this.velocityY >= 0) {
        this.isGrounded = true;
        this.velocityY = 0;
        // Ensure we stay exactly on top of the platform
        this.y = currentPlatform.y - this.height;
      } else {
        // We're jumping, so we're no longer on the platform
        this.isGrounded = false;
        this.standingOnPlatform = null;
        // Continue with normal physics for the jump
        this.y += this.velocityY;
      }
    } else {
      // Not on a platform, apply normal physics
      this.y += this.velocityY;
      this.standingOnPlatform = null;
      this.isGrounded = false;

      // Check for new platform collisions
      if (this.currentScreen) {
        for (let platform of this.currentScreen.getPlatforms()) {
          if (
            this.x < platform.x + platform.width &&
            this.x + this.width > platform.x
          ) {
            // Landing on top of platform (falling down)
            if (
              this.velocityY >= 0 &&
              oldY + this.height <= platform.y &&
              this.y + this.height >= platform.y
            ) {
              this.y = platform.y - this.height;
              this.velocityY = 0;
              this.isGrounded = true;
              this.standingOnPlatform = platform;
              break;
            }

            // Hitting platform from below (jumping up into it)
            if (
              this.velocityY < 0 &&
              oldY >= platform.y + platform.height &&
              this.y <= platform.y + platform.height
            ) {
              this.y = platform.y + platform.height;
              this.velocityY = 0;
              break;
            }
          }
        }
      }
    }

    // Ground collision
    if (this.y >= this.groundY) {
      this.y = this.groundY;
      this.velocityY = 0;
      this.isGrounded = true;
      this.standingOnPlatform = null; // Not on a platform, on ground
    }

    // Keep player within world bounds (horizontal)
    this.x = constrain(this.x, 0, worldWidth - this.width);
  }

  display() {
    // If the player is invincible, flash color
    if (this.isInvincible) {
      // Flashing effect - alternate between white and gray
      fill(frameCount % 10 < 5 ? this.color : this.flashingColor); // Flash every 10 frames
    } else {
      // Normal player color
      fill(this.color);
    }
    noStroke();
    rect(this.x, this.y, this.width, this.height);
  }

  inflictDamage(damage = 1) {
    // Simple damage - reduce health by 1
    if (this.health > 0 && !this.isInvincible) {
      this.health -= damage; // Reduce health
      this.isInvincible = true;
      setTimeout(() => {
        this.isInvincible = false;
      }, this.invincibilityDuration * 1000); // Convert seconds to milliseconds
    }
    // if health reaches 0, handle game over logic
    if (this.health <= 0) {
      this.gameOverSequence(); // Call game over sequence
    }
  }

  heal(healAmount = 1) {
    // Heal the player by a certain amount
    this.health = Math.max(this.health + healAmount, maxHealth); // Ensure health does not exceed maxHealth
  }

  gameOverSequence() {
    console.log("Game Over!");
    // Future: Implement game over logic (e.g., reset game, show game over screen)
    // For now, just reset player position and status
    this.isInvincible = false; // Reset invincibility
    this.x = 50; // Reset to starting position
    this.y = height - this.height; // Reset to ground level
    this.health = maxHealth; // Reset health
    score = 0; // Reset score
  }
}
