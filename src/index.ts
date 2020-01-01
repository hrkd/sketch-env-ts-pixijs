import * as PIXI from 'pixi.js'
import fragmentShader from './shader/main.frag'
import Circle from './circle'

//filters
const myFilter = new PIXI.Filter(null,fragmentShader,{threshold:0.5});
const blurFilter = new PIXI.filters.BlurFilter();
blurFilter.blur = 40;
blurFilter.resolution = .1;

//app
const app = new PIXI.Application({ width: 1000, height: 1000, backgroundColor: 0xffffff, antialias: true, forceFXAA: true });
const container1 = new PIXI.Container();

app.stage.interactive = true;
app.stage.addChild(container1)
container1.filters = [blurFilter, myFilter];
app.ticker.add(delta=>{
    circles.forEach(c=>{
      c.update()
    })
});

//object
const circles = new Array(10).fill(null).map(c=>new Circle(0,0, app.screen))
circles.forEach(c=>{container1.addChild(c.circle)})

//window
const resize = ()=>{
  app.renderer.resize(document.body.clientWidth, document.body.clientHeight);
}
window.onresize = resize
window.onload = resize

//run
document.body.appendChild(app.view);
