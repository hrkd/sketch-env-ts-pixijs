import * as PIXI from 'pixi.js'
import fragmentShader from './shader/main.frag'
import Circle from './circle'
import Tweakpane from 'tweakpane'

const PARAMS = {
  blur: 59.63,
  resolution: .11,
  bone: false
};

//filters
const myFilter1 = new PIXI.Filter(
  null,fragmentShader,{threshold:0.6,r:0.96,g:0.54,b:0.38}
);

const myFilter2 = new PIXI.Filter(
  null,fragmentShader,{threshold:0.6,r:0.96,g:0.88,b:0.71}
);


const myFilter3 = new PIXI.Filter(
  null,fragmentShader,{threshold:0.6,r:0.47,g:0.35,b:0.64}
);
//rgb(47%, 35%, 64%)

const blurFilter = new PIXI.filters.BlurFilter();
let bone:Boolean = true

blurFilter.blur = PARAMS.blur;
blurFilter.resolution = PARAMS.resolution;
bone = PARAMS.bone;

//app
const backgroundColor = 0x8EC8A7;
const container1 = new PIXI.Container();
const container2 = new PIXI.Container();
const container3 = new PIXI.Container();

const container4 = new PIXI.Container();

const app = new PIXI.Application({ width: 1000, height: 1000, backgroundColor: backgroundColor, antialias: true, forceFXAA: true });

app.stage.interactive = true;
app.stage.addChild(container1)
app.stage.addChild(container2)
app.stage.addChild(container3)

app.stage.addChild(container4)

container1.filters = [blurFilter, myFilter1];
container2.filters = [blurFilter, myFilter2];
container3.filters = [blurFilter, myFilter3];

app.ticker.add(delta=>{
    circles1.forEach(c=>c.update(bone))
    circles2.forEach(c=>c.update(bone))
    circles3.forEach(c=>c.update(bone))
});

//object
const circles1 = new Array(15).fill(null).map(c=>new Circle(app.screen, "LT"))
circles1.forEach(c=>{
  container1.addChild(c.circle)
  container4.addChild(c.bone)
})

const circles2 = new Array(15).fill(null).map(c=>new Circle(app.screen, "RB"))
circles2.forEach(c=>{
  container2.addChild(c.circle)
  container4.addChild(c.bone)
})

const circles3 = new Array(15).fill(null).map(c=>new Circle(app.screen, "LB"))
circles3.forEach(c=>{
  container3.addChild(c.circle)
  container4.addChild(c.bone)
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
