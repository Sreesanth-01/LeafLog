import React from "react";
import { BrowserRouter } from "react-router-dom";

import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";

import "./css/PlantCare.css";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app">
          <Navbar />

          <AppRoutes />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;