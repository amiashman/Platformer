class Camera {
  constructor() {
    this.x = 0; // Camera position in world coordinates
    this.y = 0; // Camera position in world coordinates
    this.targetX = 0; // Where camera wants to be
    this.targetY = 0; // Where camera wants to be
    this.smoothing = 0.1; // How smooth the camera movement is (0.1 = smooth, 1 = instant)
  }

  // Set camera to follow a target (like the player)
  follow(target, worldWidth, worldHeight) {
    // Center camera on target
    this.targetX = target.x - width / 2;
    this.targetY = target.y - height / 2;

    // Clamp camera to world boundaries
    this.targetX = constrain(this.targetX, 0, worldWidth - width);
    this.targetY = constrain(this.targetY, 0, worldHeight - height);

    // Smooth camera movement
    this.x = lerp(this.x, this.targetX, this.smoothing);
    this.y = lerp(this.y, this.targetY, this.smoothing);
  }

  // Apply camera transformation - call this before drawing world objects
  apply() {
    translate(-this.x, -this.y);
  }

  // Reset camera transformation - call this before drawing UI
  reset() {
    translate(this.x, this.y);
  }

  // Check if an object is visible on screen (optimization)
  isVisible(objX, objY, objWidth, objHeight) {
    return (
      objX + objWidth > this.x &&
      objX < this.x + width &&
      objY + objHeight > this.y &&
      objY < this.y + height
    );
  }
}
