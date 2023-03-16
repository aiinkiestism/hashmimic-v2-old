import { useState } from 'react';
import './App.css';
import { WebGLText } from './components/ref/WebGLText';
import { WebGLParticle } from './components/ref/WebGLParticle';
import { WegGLPhisics } from './components/ref/WebGLPhisics';
import { HomeWebGL } from './components';

function App() {
  return (
    <div className="App" style={{ width: '100%', height: '100vh' }}>
      {/* <WebGLText /> */}
      {/* <WebGLParticle /> */}
      {/* <WegGLPhisics /> */}
      <HomeWebGL />
    </div>
  )
}

export default App
