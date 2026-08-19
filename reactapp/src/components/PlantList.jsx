import React, { useEffect, useState } from 'react'
import { getPlants } from '../services/plantApi';

const PlantList = () => {

  const [plantList,setPlantList] = useState([]);
  useEffect(async()=>{
    try {
      const res = await getPlants();
      setPlantList(res);
      console.log(res);
    } catch (error) {
      
    }
  },[])
  return (
    <div>

    </div>
  )
}

export default PlantList