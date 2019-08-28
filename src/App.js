import React from 'react';
import RouterIndex from './router/index'


import Head from './components/header'
import Foot from './components/footer'
import "./view/index.css"

function App() {
  return (
    <div className='pageWrap'>
      <Head />
      <div className="main">
        <RouterIndex />
      </div>
      <Foot />
    </div>
  );
}

export default App;
