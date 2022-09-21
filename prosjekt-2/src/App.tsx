import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "./pages/LoginScreen";



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<LoginScreen/>}></Route>
          <Route path="/" element= {<LoginScreen/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
