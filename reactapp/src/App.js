import React, { useEffect, useState } from 'react'
import PlantForm from './components/PlantForm'
import PlantList from './components/PlantList'
import { addPlant, getPlants } from './services/api'

const App = () => {
  const [plantList,setPlantList] = useState([]);

  useEffect(()=>{
    fetchPlants();
  },[])

  const fetchPlants = async()=>{
    try {
      const res = await getPlants();
      setPlantList(res.data);
      console.log(res);
    } 
    catch (error) {
      console.error(error);
    }
  }

  const handleEdit = (plant) =>{
    onEdit(plant);
  }

  const handleDelete = (plant) =>{
    onDelete(plant);
  }

  const handleAddPlant = async(plant) =>{
    await addPlant(plant);
  }

  return (
    <div>
        <h1>Plant Care Scheduler</h1>
        <PlantForm onSubmit={handleAddPlant}></PlantForm>
        <PlantList plants={plantList} onEdit={handleEdit} onDelete={handleDelete}></PlantList>
    </div>
  )
}

export default App