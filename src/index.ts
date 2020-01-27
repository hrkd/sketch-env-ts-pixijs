import * as PIXI from 'pixi.js'
import fragmentShader from './shader/main.frag'
import Circle from './circle'
import Tweakpane from 'tweakpane'

const PARAMS = {
  blur: 115,
  resolution: .06,
  bone: true
};

//filters
const myFilter = new PIXI.Filter(null,fragmentShader,{threshold:0.6});
const blurFilter = new PIXI.filters.BlurFilter();
let bone:Boolean = true

blurFilter.blur = PARAMS.blur;
blurFilter.resolution = PARAMS.resolution;
bone = PARAMS.bone;

//app
const app = new PIXI.Application({ width: 1000, height: 1000, backgroundColor: 0xffffff, antialias: true, forceFXAA: true });
const container1 = new PIXI.Container();
const container2 = new PIXI.Container();

app.stage.interactive = true;
app.stage.addChild(container1)
app.stage.addChild(container2)
container1.filters = [blurFilter, myFilter];
app.ticker.add(delta=>{
    circles.forEach(c=>{
      c.update(bone)
    })
});

//object
const circles = new Array(10).fill(null).map(c=>new Circle(0,0, app.screen))
circles.forEach(c=>{
  container1.addChild(c.circle)
  container2.addChild(c.bone)
})

//window
const resize = ()=>{
  app.renderer.resize(document.body.clientWidth, document.body.clientHeight);
}
window.onresize = resize
window.onload = resize

//run
document.body.appendChild(app.view);

const pane = new Tweakpane();
pane.addInput(PARAMS, 'blur', {
  min: 10,
  max: 200,
}).on('change', e=>{
  blurFilter.blur = e;
});

pane.addInput(PARAMS, 'resolution', {
  min: .01,
  max: .2,
}).on('change', e=>{
  blurFilter.resolution = e;
})

pane.addInput(PARAMS, 'bone', {
}).on('change', e=>{
  bone = e;
})
