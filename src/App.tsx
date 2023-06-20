import React from 'react';
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";


const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login name={''}/>} />
      </Routes>
    </HashRouter>
  )
  
  };

export default App;