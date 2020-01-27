import * as PIXI from 'pixi.js'

class Circle {
  circle
  bone
  x
  y
  speedX
  speedY
  scale
  screen

  constructor(x, y, screen) {
    this.circle = new PIXI.Graphics();
    this.circle.lineStyle(0);
    this.bone = new PIXI.Graphics();
    this.x = x
    this.y = y
    this.speedX = Math.random() * 5
    this.speedY = Math.random() * 5
    this.scale = Math.random() * 300
    this.screen = screen
  }

  update(bone:Boolean = true){
    if(this.screen.width < this.x) {
      this.speedX = -Math.abs(this.speedX)
    } else if (this.x < 0) {
      this.speedX = Math.abs(this.speedX)
    }

    if(this.screen.height < this.y) {
      this.speedY = -Math.abs(this.speedY)
    } else if (this.y < 0) {
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
