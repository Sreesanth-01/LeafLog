import React from "react";

const PlantCard = ({ plant, onEdit, onDelete }) => {
  return (
    <article className="plant-card">
      <div className="plant-card-title">
        <div className="plant-card-icon">🌿</div>

        <div>
          <h2>{plant.plantName}</h2>
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
          <span className="plant-info-icon">📅</span>
          <div>
            <span>Last Watered</span>
            <strong>{plant.lastWateredDate}</strong>
          </div>
        </div>

        <div className="plant-info-row">
          <span className="plant-info-icon">🌱</span>
          <div>
            <span>Fertilizing Frequency</span>
            <strong>{plant.fertilizingFrequency}</strong>
          </div>
        </div>

        <div className="plant-info-row">
          <span className="plant-info-icon">📅</span>
          <div>
            <span>Last Fertilized</span>
            <strong>{plant.lastFertilizedDate}</strong>
          </div>
        </div>
      </div>

      <div className="plant-card-actions">
        <button
          className="plant-edit-button"
          onClick={() => onEdit(plant)}
        >
          Edit
        </button>

        <button
          className="plant-delete-button"
          onClick={() => onDelete(plant.id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
};

export default PlantCard;