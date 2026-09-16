import React from "react";
import PlantForm from "../components/PlantForm";
import { addPlant } from "../services/api";
import { useNavigate } from "react-router-dom";
import "../css/PlantCare.css";

const AddPlant = () => {
  const navigate = useNavigate();

  const handleAddPlant = async (plant) => {
    try {
      await addPlant(plant);
      alert("Plant added successfully");
      navigate("/plants");
    } catch (error) {
      console.error("Error adding plant:", error);
      alert("Failed to add plant");
    }
  };

  return (
    <main className="main-content">
      <section className="content-section">
        <div className="section-heading">
          <div>
            <p className="section-label">MANAGE YOUR PLANTS</p>
            <h2>Add a New Plant</h2>
          </div>
        </div>

        <PlantForm onSubmit={handleAddPlant} />
      </section>
    </main>
  );
};

export default AddPlant;