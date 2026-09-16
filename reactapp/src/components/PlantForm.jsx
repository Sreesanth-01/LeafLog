import React, { useState } from 'react'
import { addPlant } from '../services/plantApi';

const PlantForm = ({selectedPlant,onSubmit}) => {
  const [formData,setFormData] = useState({
    plantName:selectedPlant ? selectedPlant.name : "",
    sunlightHours:selectedPlant ? selectedPlant.sunlightHours : 0,
    wateringFrequency:selectedPlant ? selectedPlant.wateringFrequency : "",
    lastWateredDate:selectedPlant ? selectedPlant.lastWateredDate : "",
    fertilizingFrequency: selectedPlant ? selectedPlant.fertilizingFrequency : "",
    lastFertilizedDate : selectedPlant ? selectedPlant.lastFertilizedDate : ""

  });

  const handleChange = (e) =>{
    setFormData({...formData,[e.target.name]:e.target.value});
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();
    try {
      const res = await onSubmit(formData);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  }

  return (
      <form onSubmit={handleSubmit}>
        <input type='text' name='plantName' value={formData.name} placeholder='Plant Name' onChange={handleChange}></input>
        <input type='number' name='sunlightHours' value={formData.sunlightHours} onChange={handleChange}></input>
        <input type='text' name='wateringFrequency' value={formData.wateringFrequency} placeholder='Watering Frequency' onChange={handleChange}></input>
        <input type='date' name='lastWateredDate' value={formData.lastWateredDate} onChange={handleChange}></input>
        <input type='text' name='fertilizingFrequency' value={formData.fertilizingFrequency} placeholder='Fertilizing Frequency' onChange={handleChange}></input>
        <input type='date' name='lastFertilizedDate' value={formData.lastFertilizedDate} onChange={handleChange}></input>
        <button type='submit' role='button'>Add Plant</button>
      </form>
  )
}

export default PlantForm