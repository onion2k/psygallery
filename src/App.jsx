import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    const fetchRedditData = async () => {
      return await fetch(`https://www.reddit.com/r/houseporn.json`)
      .then(response => response.json())
      // .then(json => JSON.parse(json))
    }
    fetchRedditData().then((data)=>{
      console.log(data)
    })
  });

  return (
    <div className="App">
      <header className="App-header">
        Gallery
      </header>
    </div>
  );
}

export default App;
