import React, { useState } from 'react'
import { addPlant } from '../services/api';

const PlantForm = (selectedPlant) => {
  const [formData,setFormData] = useState({
    name:selectedPlant ? selectedPlant.name : "",
    wateringFrequency:selectedPlant ? selectedPlant.wateringFrequency : "",
    lastWateredDate:selectedPlant ? selectedPlant.lastWateredDate : ""
  });

  const handleChange = (e) =>{
    setFormData({...formData,[e.target.name]:e.target.value});
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();
    try {
      await onSubmit(formData);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  }

  return (
      <form onSubmit={handleSubmit}>
        <input type='text' name='name' value={formData.name} placeholder='Plant Name' onChange={handleChange}></input>
        <input type='text' name='wateringFrequency' value={formData.wateringFrequency} placeholder='Watering Frequency' onChange={handleChange}></input>
        <input type='date' name='lastWateredDate' value={formData.lastWateredDate} onChange={handleChange}></input>
        <button type='submit' role='button'>Add Plant</button>
      </form>
  )
}

export default PlantForm