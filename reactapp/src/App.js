import React from "react";
import { BrowserRouter } from "react-router-dom";

import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";

import "./css/PlantCare.css";

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />

        <AppRoutes />
      </div>
    </BrowserRouter>
  );
};

export default App;