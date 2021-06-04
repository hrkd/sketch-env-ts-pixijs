import React, { useEffect, useRef, useCallback } from 'react';
import '../styles/App.scss';
import cn from 'classnames';
import * as PIXI from 'pixi.js';
import Tweakpane from 'tweakpane';
import Ripple from '../components/Sample2/Ripple';
import Color from 'color';
import { Sample2Filter } from '../filters/Sample2/Sample2Filter';

function App() {
  const ref = useRef<HTMLDivElement | null>(null);

  const PARAMS = {
    blur: 74.0,
    resolution: 0.15,
    bone: false,
  };

  useEffect(() => {
    //app
    if (!ref) return;
    console.log(ref);
    const bg = new PIXI.Graphics();

    const app = new PIXI.Application({
      width: document.body.clientWidth,
      height: document.body.clientHeight,
      // backgroundColor: Number(Color.rgb(255, 255, 255).rgbNumber()),
      backgroundColor: Number(Color.rgb(16, 35, 52).rgbNumber()),
      antialias: true,
      // forceFXAA: true,
    });

    const container1 = new PIXI.Container();
    const container2 = new PIXI.Container();

    const blurFilter = new PIXI.filters.BlurFilter();
    blurFilter.blur = PARAMS.blur;
    const myFilter = new Sample2Filter({
      width: app.screen.width,
      height: app.screen.height,
    });

    container1.filters = [blurFilter, myFilter];

    console.log(app.screen);

    app.stage.interactive = true;
    app.stage.addChild(container1);
    app.stage.addChild(container2);

    container1.addChild(bg);
    const ripples = new Array(15)
      .fill(null)
      .map(() => new Ripple(app.screen.width, app.screen.height));
    ripples.forEach((r) => {
      container1.addChild(r.ripple);
      container2.addChild(r.bone);
    });

    app.ticker.add((delta) => {
      bg.clear();
      bg.beginFill(0xffffff);
      bg.drawRect(0, 0, app.screen.width, app.screen.height);
      bg.endFill();

      ripples.forEach((r) => {
        r.update(app.screen.width, app.screen.height, PARAMS.bone);
      });
    });

    // //window
    const resize = () => {
      const myFilter = new Sample2Filter({
        width: app.screen.width,
        height: app.screen.height,
      });

      container1.filters = [blurFilter, myFilter];

      app.renderer.resize(document.body.clientWidth, document.body.clientHeight);
    };

    window.onresize = resize;
    window.onload = resize;

    //run
    ref.current?.appendChild(app.view);
  }, [ref]);

  useEffect(() => {
    const pane = new Tweakpane();
    pane
      .addInput(PARAMS, 'blur', {
        min: 10,
        max: 200,
      })
      .on('change', (e) => {
        PARAMS.blur = e.value;
      });

    pane
      .addInput(PARAMS, 'resolution', {
        min: 0.01,
        max: 0.2,
      })
      .on('change', (e) => {});

    pane.addInput(PARAMS, 'bone', {}).on('change', (e) => {
      PARAMS.bone = e.value;
    });

    return () => {
      pane.dispose();
    };
  }, []);

  return <div className="Sample2" ref={ref} />;
}

export default App;
