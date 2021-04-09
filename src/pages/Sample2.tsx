import React, { useEffect, useRef, useCallback } from 'react';
import '../styles/App.scss';
import cn from 'classnames';
import * as PIXI from 'pixi.js';
import fragmentShader from '../shader/main.frag';
import Circle from './circle';
import Tweakpane from 'tweakpane';
import Color from 'color';

function App() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    //app
    const app = new PIXI.Application({
      width: document.body.clientWidth,
      height: document.body.clientHeight,
      backgroundColor: Number(Color.rgb(255, 255, 255).rgbNumber()),
      antialias: true,
      // forceFXAA: true,
    });

    app.stage.interactive = true;
    app.ticker.add((delta) => {});

    // //window
    const resize = () => {
      app.renderer.resize(document.body.clientWidth + 40, document.body.clientHeight + 40);
    };

    window.onresize = resize;
    window.onload = resize;

    //run
    console.log(ref);
    ref.current?.appendChild(app.view);
  }, [ref]);

  useEffect(() => {
    const PARAMS = {
      blur: 74.0,
      resolution: 0.15,
      bone: false,
    };

    const pane = new Tweakpane();
    pane
      .addInput(PARAMS, 'blur', {
        min: 10,
        max: 200,
      })
      .on('change', (e) => {});

    pane
      .addInput(PARAMS, 'resolution', {
        min: 0.01,
        max: 0.2,
      })
      .on('change', (e) => {});

    pane.addInput(PARAMS, 'bone', {}).on('change', (e) => {});

    return () => {
      pane.dispose();
    };
  }, []);

  return <div className="Sample2" ref={ref} />;
}

export default App;
