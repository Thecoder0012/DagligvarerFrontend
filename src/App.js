import { Routes, Route} from "react-router-dom"
import  Navbar  from './components/Navbar';
import  Home  from './components/Home';
import  Products  from './components/Products';


import React from 'react';

function App() {
  return (
    <div className="App">

    <Navbar/>
    
      <Routes>
        <Route path="/" element={[ <Home />]} />
        <Route path="/products"  element={<Products /> }/>
      </Routes>


     
    </div>
  );
}

export default App;
