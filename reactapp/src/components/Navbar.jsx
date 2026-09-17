import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-icon">🌿</span>
        <span>PlantCare</span>
      </div>

      <div className="navbar-links">
        <Link to="/">Dashboard</Link>

        {token && (
          <>
            <Link to="/plants">My Plants</Link>
            <Link to="/add-plant">Add Plant</Link>
            <Link to="/care-plan">Care Plan</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}

        {!token && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;