import { useEffect, useState, useRef } from 'react';
import './App.css';
import { HomeWebGL } from './components';

function App() {
  const ref = useRef<boolean>(true);
  const audio = new Audio("/lofi-sample.mp3");

  audio.play();

  return (
    <div className="App" style={{ width: '100%', height: '100vh' }}>
      <HomeWebGL />
    </div>
  )
}

export default App
