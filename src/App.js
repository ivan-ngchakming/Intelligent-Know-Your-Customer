import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const handleClick = () => {
    console.log("Clicked Foo 1");
    const student = {name: 'Lucas', school: 'HKU'}
    window.server.foo.foo('test', 69, JSON.stringify(student)).then(res => {
      console.log(res);
    })
  }

  const handleClick2 = () => {
    console.log("Clicked Foo 2");
    window.server.transactions.example_api();
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <button onClick={handleClick}>Foo</button>
        <button onClick={handleClick2}>Foo 2</button>
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
