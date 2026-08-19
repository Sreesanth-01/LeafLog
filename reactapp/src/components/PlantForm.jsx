import React, { useState } from 'react'
import { addPlant } from '../services/plantApi';

const PlantForm = () => {
  const [formData,setFormData] = useState({
    plantName:"",
    wateringFrequency:0,
    sunlightHours:0,
    fertilizingFrequency:0
  });

  const handleChange = (e) =>{
    setFormData({...form,[e.target.name]:e.target.value});
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();
    try {
      const res = await addPlant(formData);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='text' name='plantName' value={formData.plantName} placeholder='Enter PlantName' ></input>
        <input type='number' name='wateringFrequency' value={formData.wateringFrequency} placeholder='Watering Frequency' ></input>
        <input type='number' name='sunlightFrequency' value={formData.sunlightHours} placeholder='Sunlight Frequency' ></input>
        <input type='number' name='fertilizingFrequency' value={formData.fertilizingFrequency} placeholder='Fertilizing Frequency'></input>
        <button type='submit'></button>
      </form>
    </div>
  )
}

export default PlantForm