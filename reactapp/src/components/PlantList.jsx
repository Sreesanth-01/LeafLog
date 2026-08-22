import React, { useEffect, useState } from 'react'
import PlantCard from './PlantCard';

const PlantList = ({plants,onEdit,onDelete}) => {

  return (
    <div>
      <h2>Plant List</h2>
      <div>
          {plants.length>0 && plants.map((plant)=>(
            <PlantCard
              key={plant.id}
              plant={plant}
              onEdit={onEdit}
              onDelete={onDelete} 
            />
          ))}
      </div>
    </div>
  )
}

export default PlantList