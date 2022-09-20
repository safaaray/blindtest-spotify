/*global swal*/

import React, { useEffect } from 'react';
import logo from './logo.svg';
import loading from './loading.svg';
import './App.css';
import Sound from 'react-sound';
import Button from './Button';
import { useState } from 'react';

const apiToken = 'BQAcE0QDAw56atF0MVokvw98QHfNeb4V-PxExZ-E13E3JXoDOeyFGxr8GbdxTkAJdjCtIH8163Es1V7MZnrW8Ngmdk9mXHepl4DMEL9dLNpCvQKnyAqqd-L15ikMVuweKDu6IKQXlkBUW6MQYLTt1NsGJ-NxZR2OCsVzyDGssKjEv3U0g2nHz0CcRLnvAnQbDGFRrmly7ddOmZvK';

function shuffleArray(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = getRandomNumber(counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

/* Return a random number between 0 included and x excluded */
function getRandomNumber(x) {
  return Math.floor(Math.random() * x);
}

const App = () => {
  const [text, setText] = useState('');
  const [tracks, setTracks] = useState('');
  const [songsLoaded, setLoaded] = useState(false);

  useEffect(() => {
    setText("Bonjour");
    fetch('https://api.spotify.com/v1/me/tracks', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + apiToken,
      },
    })
      .then(response => response.json())
      .then((data) => {
        console.log("Réponse reçue ! Voilà ce que j'ai reçu : ", data);
        setTracks(data.items);
        setLoaded(true);
      })
  }, []);

  if (songsLoaded) {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Bienvenue sur le Blindtest</h1>
        </header>
        <div className="App-images">
          <p>{text} ! Il y a {tracks.length} morceaux disponibles !</p>
        </div>
        <div className="App-buttons">
          <p> Le premier morceau est : {tracks[0].track.name} </p>
        </div>
      </div>
    );
  }
  else {
    return (
      <div className="App-images">
        <img src={loading} className="App-images" alt="loading" />
      </div>
    )
  }

}

export default App;
