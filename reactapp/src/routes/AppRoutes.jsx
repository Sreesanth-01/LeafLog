import React from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Plants from "../pages/Plants";
import AddPlant from "../pages/AddPlant";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/plants" element={<Plants />} />

      <Route path="/add-plant" element={<AddPlant />} />

      <Route path="/edit-plant/:id" element={<EditPlant />} />
    </Routes>
  );
};

export default AppRoutes;