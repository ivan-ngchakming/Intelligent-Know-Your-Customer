import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [log, setLog] = useState('null')
  const handleClick = () => {
    const student = {name: 'Lucas', school: 'HKU'}
    window.backend.foo('test', 69, JSON.stringify(student)).then(res => {
      setLog(res);
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {log}
        </p>
        <button onClick={handleClick}>Click Me</button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
