import React from 'react';
import Register from './components/Register';  
import Login from './components/Login';
import {BrowserRouter, Routes,Route} from "react-router-dom"

function App() {
    return (
        <div>
        <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
    
      </Routes>
   </BrowserRouter>
        </div>
    );
}

export default App;
