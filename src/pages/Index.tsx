import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Index.scss';

function App() {
  useEffect(() => {}, []);

  return (
    <div className="Index">
      <ul>
        <li>
          <Link to="sample1">Sample1</Link>
        </li>
        <li>
          <Link to="sample2">Sample2</Link>
        </li>
      </ul>
    </div>
  );
}

export default App;
