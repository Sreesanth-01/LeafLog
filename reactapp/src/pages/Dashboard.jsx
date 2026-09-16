import React, { useEffect, useState } from "react";
import { getPlants } from "../services/api";
import "../css/PlantCare.css";

const Dashboard = () => {
  const [plantList, setPlantList] = useState([]);

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    try {
      const response = await getPlants();
      setPlantList(response.data);
    } catch (error) {
      console.error("Error fetching plants:", error);
    }
  };

  return (
    <main className="main-content">
      <section className="welcome-section">
        <div>
          <p className="welcome-label">PLANT CARE DASHBOARD</p>

          <h1>Plant Care Scheduler 🌱</h1>

          <p className="welcome-text">
            Keep your plants healthy, happy, and beautifully maintained.
          </p>
        </div>
      </section>

      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🌿</div>

          <div>
            <p>Total Plants</p>
            <h2>{plantList.length}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💧</div>

          <div>
            <p>Watering</p>
            <h2>Today</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🌱</div>

          <div>
            <p>Growing</p>
            <h2>Healthy</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📅</div>

          <div>
            <p>Schedule</p>
            <h2>Active</h2>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;