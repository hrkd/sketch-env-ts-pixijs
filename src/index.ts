import * as PIXI from 'pixi.js'

const app = new PIXI.Application({width: 500, height: 500});
app.renderer.backgroundColor = 0xff0000;

document.body.appendChild(app.view);
