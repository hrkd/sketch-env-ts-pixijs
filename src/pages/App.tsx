import React, { useEffect, useState, useCallback } from 'react';
import '../styles/App.scss';
import cn from 'classnames';
import * as PIXI from 'pixi.js';
import fragmentShader from '../shader/main.frag';
import Circle from './circle';
import Tweakpane from 'tweakpane';
import Color from 'color';

function App() {
  const PARAMS = {
    blur: 74.0,
    resolution: 0.15,
    bone: false,
  };

  let colors: Color[] = [
    Color.rgb(119, 89, 163),
    Color.rgb(246, 225, 180),
    Color.rgb(146, 196, 168),
    Color.rgb(247, 138, 99),
  ];

  function shuffle(array: Color[]) {
    array.sort(() => Math.random() - 0.5);
  }
  shuffle(colors);

  //filters
  const myFilter1 = new PIXI.Filter(undefined, fragmentShader, {
    threshold: 0.6,
    r: colors[0].array()[0] / 255,
    g: colors[0].array()[1] / 255,
    b: colors[0].array()[2] / 255,
  });

  const myFilter2 = new PIXI.Filter(undefined, fragmentShader, {
    threshold: 0.6,
    r: colors[1].array()[0] / 255,
    g: colors[1].array()[1] / 255,
    b: colors[1].array()[2] / 255,
  });

  const myFilter3 = new PIXI.Filter(undefined, fragmentShader, {
    threshold: 0.6,
    r: colors[2].array()[0] / 255,
    g: colors[2].array()[1] / 255,
    b: colors[2].array()[2] / 255,
  });
  // rgb(47%, 35%, 64%)

  const blurFilter = new PIXI.filters.BlurFilter();
  let bone: Boolean = true;

  blurFilter.blur = PARAMS.blur;
  blurFilter.resolution = PARAMS.resolution;
  bone = PARAMS.bone;

  useEffect(() => {
    //app
    const container1 = new PIXI.Container();
    const container2 = new PIXI.Container();
    const container3 = new PIXI.Container();

    const container4 = new PIXI.Container();

    const app = new PIXI.Application({
      width: document.body.clientWidth,
      height: document.body.clientHeight,
      backgroundColor: Number(`0x${colors[3].hex().replace('#', '')}`),
      antialias: true,
      // forceFXAA: true,
    });

    app.stage.interactive = true;
    app.stage.addChild(container1);
    app.stage.addChild(container2);
    app.stage.addChild(container3);

    app.stage.addChild(container4);

    container1.filters = [blurFilter, myFilter1];
    container2.filters = [blurFilter, myFilter2];
    container3.filters = [blurFilter, myFilter3];

    app.ticker.add((delta) => {
      circles1.forEach((c) => c.update(bone));
      circles2.forEach((c) => c.update(bone));
      circles3.forEach((c) => c.update(bone));
    });

    // //object
    const circles1 = new Array(15).fill(null).map((c) => new Circle(app.screen, 'LT'));
    circles1.forEach((c) => {
      container1.addChild(c.circle);
      container4.addChild(c.bone);
    });

    const circles2 = new Array(15).fill(null).map((c) => new Circle(app.screen, 'RB'));
    circles2.forEach((c) => {
      container2.addChild(c.circle);
      container4.addChild(c.bone);
    });

    const circles3 = new Array(15).fill(null).map((c) => new Circle(app.screen, 'LB'));
    circles3.forEach((c) => {
      container3.addChild(c.circle);
      container4.addChild(c.bone);
    });

    // //window
    const resize = () => {
      app.renderer.resize(document.body.clientWidth + 40, document.body.clientHeight + 40);
    };

    const pane = new Tweakpane();
    pane
      .addInput(PARAMS, 'blur', {
        min: 10,
        max: 200,
      })
      .on('change', (e) => {
        blurFilter.blur = e.value;
      });

    pane
      .addInput(PARAMS, 'resolution', {
        min: 0.01,
        max: 0.2,
      })
      .on('change', (e) => {
        blurFilter.resolution = e.value;
      });

    pane.addInput(PARAMS, 'bone', {}).on('change', (e) => {
      bone = e.value;
    });

    window.onresize = resize;
    window.onload = resize;

    //run
    document.querySelector('.App')?.appendChild(app.view);
  }, []);

  return <div className="App" />;
}

export default App;
