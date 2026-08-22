import React from 'react'

const PlantCard = ({plant,onEdit,onDelete}) => {
  return (
    <div>
      <h2>{plant.name}</h2>
      <p>Watering Frequency: {plant.wateringFrequency}</p>
      <p>Last Watered on: {plant.lastWateredDate}</p>
      <button role='button' onClick={()=>onEdit(plant)}>Edit</button>
      <button role='button' onClick={()=>onDelete(plant.id)}>Delete</button>
    </div>
  )
}

export default PlantCard