import { useState } from 'react';
import './App.css';
import { WebGLText } from './components/ref/WebGLText';
import { WebGLParticle } from './components/ref/WebGLParticle';
import { WegGLPhisics } from './components/ref/WebGLPhisics';

function App() {
  return (
    <div className="App">
      {/* <WebGLText /> */}
      {/* <WebGLParticle /> */}
      <WegGLPhisics />
    </div>
  )
}

export default App
