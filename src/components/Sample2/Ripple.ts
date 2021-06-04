import * as PIXI from 'pixi.js';
import _ from 'underscore';

type rippleType = 'LT' | 'RT' | 'LB' | 'RB';

class Ripple {
  ripple: PIXI.Graphics;
  bone: PIXI.Graphics;
  x: number = 100;
  y: number = 100;
  speed: number = Math.random() * 3 + 3;
  scale: number;
  max: number = 800;
  min: number = 0;

  constructor(width: number, height: number) {
    this.ripple = new PIXI.Graphics();
    this.ripple.lineStyle(0);
    this.bone = new PIXI.Graphics();
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.scale = this.min; //random.integer(20, Math.min(screen.width, screen.height) / 5);
  }

  update(width: number, height: number, bone: boolean) {
    if (this.scale > this.max) {
      this.ripple.clear();
      this.scale = this.min;
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.speed = Math.random() * 3 + 3;
      return;
    } else {
      this.scale += this.speed;
      this.ripple.clear();
      this.ripple.lineStyle(150, 0x000000, 1);
      this.ripple.drawCircle(this.x, this.y, this.scale);
      this.ripple.endFill();
      this.ripple.alpha = (this.max - this.scale) / (this.max - this.min);
    }

    this.bone.clear();
    if (bone) {
      this.bone.lineStyle(1, 0xff0000, 1);
      this.bone.drawCircle(this.x, this.y, this.scale);
      this.bone.endFill();
    }
  }
}

export default Ripple;
