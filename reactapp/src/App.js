import React, { useEffect, useState } from 'react'
import PlantForm from './components/PlantForm'
import PlantList from './components/PlantList'
import { addPlant, getPlants } from './services/api'
import './css/PlantCare.css';

const App = () => {
  const [plantList, setPlantList] = useState([]);

  useEffect(() => {
    fetchPlants();
  }, [])

  const fetchPlants = async () => {
    try {
      const res = await getPlants();
      setPlantList(res.data);
      console.log(res);
    }
    catch (error) {
      console.error(error);
    }
  }

  const handleEdit = (plant) => {
    onEdit(plant);
  }

  const handleDelete = (plant) => {
    onDelete(plant);
  }

  const handleAddPlant = async (plant) => {
    await addPlant(plant);
  }

  return (
    <div className="app">

      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">
          <span className="brand-icon">🌿</span>
          <span>PlantCare</span>
        </div>

        <div className="navbar-links">
          <a href="#dashboard">Dashboard</a>
          <a href="#plants">My Plants</a>
          <a href="#add-plant">Add Plant</a>
        </div>
      </nav>
      {/* Main Content */}
      <main className="main-content">

        {/* Header */}
        <section className="welcome-section" id="dashboard">
          <div>
            <p className="welcome-label">PLANT CARE DASHBOARD</p>
            <h1>Plant Care Scheduler🌱</h1>
            <p className="welcome-text">Keep your plants healthy, happy, and beautifully maintained.</p>
          </div>
        </section>


        {/* Statistics */}
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


{/* Add Plant */}
      <section className="content-section" id="add-plant">
        <div className="section-heading">
          <div>
            <p className="section-label">MANAGE YOUR PLANTS</p>
            <h2>Add a New Plant</h2>
          </div>
        </div>

        <PlantForm onSubmit={handleAddPlant}></PlantForm>
      </section>


{/* Plant List */}
      <section className="content-section" id="plants">
        <div className="section-heading">
          <div>
            <p className="section-label">YOUR COLLECTION</p>
            <h2>My Plants</h2>
          </div>

          <span className="plant-count">
            {plantList.length} {plantList.length === 1 ? 'Plant' : 'Plants'}
          </span>
        </div>

        <PlantList  plants={plantList}  onEdit={handleEdit} onDelete={handleDelete}/>
      </section>

</main>

</div>
)
}

export default App


   