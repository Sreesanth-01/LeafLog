import React, { useEffect, useState } from "react";
import PlantList from "../components/PlantList";
import { getPlants } from "../services/api";
import "../css/PlantCare.css";

const Plants = () => {
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

  const handleEdit = (plant) => {
    console.log("Edit plant:", plant);
  };

  const handleDelete = (plant) => {
    console.log("Delete plant:", plant);
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