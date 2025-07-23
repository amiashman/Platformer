// Moving Platform class - extends Platform
class MovingPlatform extends Platform {
  constructor(x, y, width, height, axis, min, max, speed, spiked = false) {
    super(x, y, width, height, spiked);
    this.axis = axis; // 'H' or 'V'
    this.min = min; // Left boundary (horizontal) or top boundary (vertical)
    this.max = max; // Right boundary (horizontal) or bottom boundary (vertical)
    this.speed = speed; // Movement speed
    this.direction = 1; // 1 for right/down, -1 for left/up
  }

  update() {
    // Store previous position to calculate velocity
    let prevX = this.x;
    let prevY = this.y;

    if (this.axis == "H") {
      // Move horizontally
      this.x += this.speed * this.direction;

      // Reverse direction when hitting boundaries
      if (this.x <= this.min) {
        this.x = this.min;
        this.direction = 1; // Start moving right
      } else if (this.x >= this.max) {
        this.x = this.max;
        this.direction = -1; // Start moving left
      }
    } else if (this.axis == "V") {
      // Move vertically
      this.y += this.speed * this.direction;

      // Reverse direction when hitting boundaries
      if (this.y <= this.min) {
        this.y = this.min;
        this.direction = 1; // Start moving down
      } else if (this.y >= this.max) {
        this.y = this.max;
        this.direction = -1; // Start moving up
      }
    }

    // Calculate actual velocity based on position change
    this.velocityX = this.x - prevX;
    this.velocityY = this.y - prevY;
  }
}
