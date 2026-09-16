import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PlantList from "../components/PlantList";
import { getPlants, deletePlant } from "../services/plantApi";
import "../css/PlantCare.css";

const Plants = () => {
  const [plantList, setPlantList] = useState([]);
  const navigate = useNavigate();

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

  const handleEdit = (plant) => {
    navigate(`/edit-plant/${plant.id}`, { state: { plant } });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this plant?");
    if (!confirmDelete) return;

    try {
      await deletePlant(id);
      setPlantList((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting plant:", error);
      alert("Failed to delete plant");
    }
  };

  return (
    <main className="main-content">
      <section className="content-section">
        <div className="section-heading">
          <div>
            <p className="section-label">YOUR COLLECTION</p>
            <h2>My Plants</h2>
          </div>

          <span className="plant-count">
            {plantList.length}{" "}
            {plantList.length === 1 ? "Plant" : "Plants"}
          </span>
        </div>

        <PlantList
          plants={plantList}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </section>
    </main>
  );
};

export default Plants;