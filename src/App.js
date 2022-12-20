import { Routes, Route} from "react-router-dom"
import  Navbar  from './components/Navbar';
import  Home  from './components/Home';
import  Products  from './components/Products';
import  Order  from './components/Order';
import  Delivery  from './components/Delivery';




import React from 'react';

function App() {
  return (
    <div className="App">

    <Navbar/>
    
      <Routes>
        <Route path="/" element={[ <Home />]} />
        <Route path="/products"  element={<Products /> }/>
        <Route path="/order"  element={<Order /> }/>
        <Route path="/delivery"  element={<Delivery /> }/>

      </Routes>


     
    </div>
  );
}

export default App;
