package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.examly.springapp.dto.PlantRequest;
import com.examly.springapp.model.Plant;
import com.examly.springapp.repository.PlantRepo;

@Service
public class PlantService {
    private final PlantRepo plantRepo;

    public PlantService(PlantRepo plantRepo){
        this.plantRepo = plantRepo;
    }

    public Plant addPlant(PlantRequest plantData){
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

    public Optional<Plant> getPlantById(long id){
        return plantRepo.findById(id);
    }

    public void deletePlant(long id){
        plantRepo.deleteById(id);
    }

    public List<Plant> generateCarePlan(String method){
        Sort sort;
        if(method.equals("water")){
            sort = Sort.by("wateringFrequency").ascending();
        }
        else if(method.equals("sunlight")){
            sort = Sort.by("sunlightHours").descending();
        }
        else{
            return plantRepo.findAll();
        }
        return plantRepo.findAll(sort);


    }
}
