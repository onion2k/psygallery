import React, { useState } from 'react';
import useRaf from "./useRaf";
import './App.css';

function App() {

  const [active, setActive] = useState(false);

  useRaf((time) => {
    //world runner
    if (active) {
      console.log(time);
    }
  }, active);

  return (
    <div className="App">
      <header className="App-header">
        Gallery
      </header>
    </div>
  );
}

export default App;
