import React, { useEffect, useState, useCallback } from 'react';
import logo from '../logo.svg';
import '../styles/App.scss';
import { useApi } from '../hooks/useApi';
import { useTransitionEnd } from '../hooks/useTransitionEnd';
import { delay } from '../utils/delay';
import cn from 'classnames';

function App() {
  const [works] = useApi('works');
  const [init, setInit] = useState<boolean>(false);
  const [ready, transitionEnd, setTransitionTarget] = useTransitionEnd();

  useEffect(() => {
    if (!ready) return;
    (async () => {
      console.log('start');
      await delay(1000);
      console.log('1000ms later');
      setInit(true);
      await transitionEnd;
      alert('transition end');
    })();
  }, [ready]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className={cn({ init: init })} ref={setTransitionTarget}>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {works && works.map((work, index) => <p key={index}>{work.slug}</p>)}
      </header>
    </div>
  );
}

export default App;
