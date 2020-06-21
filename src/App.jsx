import React, { useState, useEffect } from 'react';
import './App.css';
import Gallery from './Gallery';

function App() {

  const [images, setImages] = useState([]);

  useEffect(() => {
    const tempImages = [];
    const fetchRedditData = async () => {
      return await fetch(`https://www.reddit.com/r/earthporn.json`)
      .then(response => response.json())
    }
    fetchRedditData().then((data)=>{
      data.data.children.forEach((post) => {
        if (post.data && post.data.preview && post.data.preview.images && post.data.preview.images[0] && post.data.preview.images[0].resolutions) {
          let url = decodeURI(String(post.data.preview.images[0].resolutions[2].url));
          url = url.replace(/&amp;/g, '&');
          tempImages.push(url);
        }
      });
      setImages(tempImages);
    });
  }, []);

  return (
    <div className="App">
      <Gallery images={images} />
    </div>
  );
}

export default App;
