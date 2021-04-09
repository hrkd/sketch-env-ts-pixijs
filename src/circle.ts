import * as PIXI from 'pixi.js'
import { Random } from "random-js";

class Circle {
  circle
  bone
  x
  y
  speedX
  speedY
  scale
  screen
  type

  constructor(screen, type="LT") {
    const random = new Random(); // uses the nativeMath engine

    this.circle = new PIXI.Graphics();
    this.circle.lineStyle(0);
    this.bone = new PIXI.Graphics();
    switch(type) {
      case "LT":
        this.x = random.integer(0, screen.width/2)
        this.y = random.integer(0, screen.height/2)
        break;
      case "RT":
        this.x = random.integer(screen.width/2, screen.width)
        this.y = random.integer(0, screen.height/2)
        break;
      case "LB":
        this.x = random.integer(0, screen.width/2)
        this.y = random.integer(screen.height/2, screen.height)
        break;
      case "RB":
        this.x = random.integer(screen.width/2, screen.width)
        this.y = random.integer(screen.height/2, screen.height)
        break;
    }

    this.speedX = this.speedY = Math.random() * 3
    this.scale = random.integer(20, Math.min(screen.width,screen.height)/5)
    this.screen = screen
    this.type = type
  }

  update(bone:Boolean = true){
    let maxX:Boolean
    let minX:Boolean
    let maxY:Boolean
    let minY:Boolean

    switch(this.type) {
      case "LT":
        maxX = this.screen.width/2 < this.x
        minX = this.x < 0

        maxY = this.screen.height/2 < this.y
        minY = this.y < 0
        break;
      case "RT":
        maxX = this.screen.width < this.x
        minX = this.x < this.screen.width/2

        maxY = this.screen.height/2 < this.y
        minY = this.y < 0
        break;
      case "LB":
        maxX = this.screen.width/2 < this.x
        minX = this.x < 0

        maxY = this.screen.height < this.y
        minY = this.y < this.screen.height/2
        break;
      case "RB":
        maxX = this.screen.width < this.x
        minX = this.x < this.screen.width/2

        maxY = this.screen.height < this.y
        minY = this.y < this.screen.height/2
        break;
    }

    if(maxX) {
      this.speedX = -Math.abs(this.speedX)
    } else if (minX) {
      this.speedX = Math.abs(this.speedX)
    }

    if(maxY) {
      this.speedY = -Math.abs(this.speedY)
    } else if (minY) {
      this.speedY = Math.abs(this.speedY)
    }

    this.x += this.speedX
    this.y += this.speedY
    this.circle.clear();
    this.circle.beginFill(0x000000, 1);
    this.circle.drawCircle(this.x, this.y, this.scale);
    this.circle.endFill();

    this.bone.clear();
    if(bone) {
      this.bone.lineStyle(1, 0xff0000, .7);
      this.bone.drawCircle(this.x, this.y, this.scale-20);
      this.bone.endFill();
    }
  }
}

export default Circle
