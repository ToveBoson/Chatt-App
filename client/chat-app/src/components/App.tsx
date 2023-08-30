import React from "react";
import "../styling/HomePage.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import Lobby from "./Lobby";
import { useSocket } from "../context/socket-context";

function App() {

  // Skall synas när du skrivit in anv.namn
  // const { room } = useSocket();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<Lobby />} />
      </Routes>
    </Router>
  );
}

export default App;
