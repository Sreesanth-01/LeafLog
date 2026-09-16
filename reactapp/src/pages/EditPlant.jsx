import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PlantForm from "../components/PlantForm";
import { updatePlant } from "../services/plantApi";
import "../css/PlantCare.css";

const EditPlant = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const handleUpdatePlant = async (plant) => {
    try {
      await updatePlant(id, plant);
      alert("Plant updated successfully");
      navigate("/plants");
    } catch (error) {
      console.error("Error updating plant:", error);
      alert("Failed to update plant");
    }
  };

  return (
    <main className="main-content">
      <section className="content-section">
        <div className="section-heading">
          <div>
            <p className="section-label">MANAGE YOUR PLANTS</p>
            <h2>Edit Plant</h2>
          </div>
        </div>

        <PlantForm selectedPlant={state?.plant} onSubmit={handleUpdatePlant} />
      </section>
    </main>
  );
};

export default EditPlant;