import React from 'react';
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";


const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/homepage" element={<HomePage/>} />
      </Routes>
    </HashRouter>
  )
  
  };

export default App;