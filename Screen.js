// Screen class - represents what's viewable on the canvas
class Screen {
  constructor() {
    this.platforms = [];
    this.door = null; // Optional door for screen transitions
    this.items = []; // Items like coins that can be collected
    this.backgroundColor = "#000000"; // Black
    this.code;
    this.width;
    this.height;
  }

  static generate(generationString) {
    let screen = new Screen();
    let parts = generationString.split("|");
    parts.forEach((part) => {
      let type = part.charAt(0);
      let params = part.slice(2).split("-");
      switch (type) {
        case "S": // Screen
          screen.code = params[0];
          screen.width = Number(params[1]); // Set screen width
          screen.height = Number(params[2]); // Set screen height
          break;
        case "P": // Platform
          screen.addPlatform(
            new Platform(
              Number(params[0]),
              Number(params[1]),
              Number(params[2]),
              Number(params[3]),
              params[4] === "T" ? true : false
            )
          );
          break;
        case "M": // Moving Platform
          screen.addPlatform(
            new MovingPlatform(
              Number(params[0]),
              Number(params[1]),
              Number(params[2]),
              Number(params[3]),
              params[4],
              Number(params[5]),
              Number(params[6]),
              Number(params[7]),
              params[8] === "T" ? true : false
            )
          );
          break;
        case "D": // Door
          screen.addDoor(
            new Door(Number(params[0]), Number(params[1]), params[2])
          ); // fix to use screen codes.
          break;
        case "I": // Item
          let itemCode = params[0];
          switch (itemCode) {
            case "200": // Coin
              screen.addItem(new Coin(Number(params[1]), Number(params[2])));
              break;
            case "201": // Poison
              screen.addItem(new Poison(Number(params[1]), Number(params[2])));
              break;
            case "100": // Key
              screen.addItem(new Key(Number(params[1]), Number(params[2])));
              break;
          }
          break;
      }
    });
    return screen;
  }

  addPlatform(platform) {
    this.platforms.push(platform);
  }

  getPlatforms() {
    return this.platforms;
  }

  addDoor(door) {
    this.door = door; // Add a door to the screen
  }

  addItem(item) {
    this.items.push(item); // Add an item to the screen
  }

  getCode() {
    return this.code;
  }

  getWidth() {
    return this.width; // Get the screen width
  }

  getHeight() {
    return this.height; // Get the screen height
  }

  update() {
    // Update all platforms in this screen
    for (let platform of this.getPlatforms()) {
      platform.update();
    }
  }

  checkCollisions(player) {
    // Check all platforms for collisions with player
    this.checkPlatformCollisions(player);
    // Check door for collisions with player
    this.checkDoorCollisions(player);
    // Check items for collisions with player
    this.checkItemCollisions(player);
  }

  checkPlatformCollisions(player) {
    // Check all platforms for collisions with player
    for (let platform of this.getPlatforms()) {
      platform.checkPlayerCollision(player);
    }
  }

  checkDoorCollisions(player) {
    // Check door for collisions with player
    if (this.door) {
      this.door.checkPlayerCollision(player);
    }
  }

  checkItemCollisions(player) {
    // Check all items for collisions with player
    for (let item of this.items) {
      item.checkPlayerCollision(player);
    }
  }

  display() {
    // Draw background
    background(this.backgroundColor);

    // Draw all platforms
    for (let platform of this.getPlatforms()) {
      platform.display();
    }

    // Draw door if it exists
    if (this.door) {
      this.door.display();
    }

    // Draw all items
    for (let item of this.items) {
      item.display();
    }
  }
}
