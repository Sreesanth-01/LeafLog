package com.examly.springapp.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.examly.springapp.dto.PlantData;
import com.examly.springapp.model.Plant;
import com.examly.springapp.repository.PlantRepo;

@Service
public class PlantServiceImpl implements PlantService {
    private final PlantRepo plantRepo;

    public PlantServiceImpl(PlantRepo plantRepo){
        this.plantRepo = plantRepo;
    }

    public Plant addPlant(PlantData plantData){
        Plant plant = new Plant();
        plant.setPlantName(plantData.getPlantName());
        plant.setWateringFrequency(plantData.getWateringFrequency());
        plant.setSunlightHours(plantData.getSunlightHours());
        plant.setFertilizingFrequency(plantData.getFertilizingFrequency());

        return plantRepo.save(plant);
    }

    public List<Plant> getAllPlants(){
        return plantRepo.findAll();
    }
}
