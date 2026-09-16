import React from 'react'
import PlantCard from './PlantCard';

const PlantList = ({plants,onEdit,onDelete}) => {

  return (
    <main className='main-content'>
      <h2>Plant List</h2>

      {plants.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🌱</div>
          <h3>No plants yet</h3>
          <p>Add your first plant to start managing your collection.</p>
        </div>
      ) : (
        <div className="plant-grid">
          {plants.map((plant) => (
            <PlantCard
              key={plant.id}
              plant={plant}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </main>
  )
}

export default PlantList