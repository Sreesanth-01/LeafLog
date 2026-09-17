// src/pages/CarePlan.jsx

import React, { useState } from "react";
import { getCarePlan } from "../services/plantApi";
import "../css/PlantCare.css";

const CarePlan = () => {
  const [method, setMethod] = useState("water");
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGeneratePlan = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getCarePlan(method);
      setPlants(response.data);
    } catch (err) {
      console.error("Error generating care plan:", err);
      setError("Unable to generate care plan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="main-content">
      <section className="content-section">
        <div className="section-heading">
          <div>
            <p className="section-label">PLANT MANAGEMENT</p>
            <h2>Care Plan</h2>
            <p>
              Generate a care plan based on watering frequency or sunlight
              requirements.
            </p>
          </div>
        </div>

        <div className="form-card">
          <div className="form-group">
            <label htmlFor="careMethod">Care Plan Type</label>

            <select
              id="careMethod"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            >
              <option value="water">Watering Frequency</option>
              <option value="sunlight">Sunlight Hours</option>
            </select>
          </div>

          <button
            className="primary-button"
            onClick={handleGeneratePlan}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Care Plan"}
          </button>
        </div>

        {error && <p className="error-message">{error}</p>}

        {plants.length > 0 && (
          <div className="plant-grid">
            {plants.map((plant) => (
              <article className="plant-card" key={plant.id}>
                <div className="plant-card-title">
                  <div className="plant-card-icon">🌿</div>

                  <div>
                    <h2>{plant.plantName || plant.name}</h2>
                    <p>Plant</p>
                  </div>
                </div>

                <div className="plant-card-info">
                  <div className="plant-info-row">
                    <span className="plant-info-icon">💧</span>
                    <div>
                      <span>Watering Frequency</span>
                      <strong>{plant.wateringFrequency}</strong>
                    </div>
                  </div>

                  <div className="plant-info-row">
                    <span className="plant-info-icon">☀️</span>
                    <div>
                      <span>Sunlight Hours</span>
                      <strong>{plant.sunlightHours}</strong>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {!loading && plants.length === 0 && !error && (
          <div className="empty-state">
            <div className="empty-icon">🌱</div>
            <h3>No care plan generated</h3>
            <p>Select a care plan type and click Generate Care Plan.</p>
          </div>
        )}
      </section>
    </main>
  );
};

export default CarePlan;