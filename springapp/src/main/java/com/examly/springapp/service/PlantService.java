package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.examly.springapp.dto.EditPlantRequest;
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
        plant.setLastWateredDate(plantData.getLastWateredDate());
        plant.setSunlightHours(plantData.getSunlightHours());
        plant.setFertilizingFrequency(plantData.getFertilizingFrequency());
        plant.setLastFertilizedDate(plantData.getLastFertilizedDate());git

        return plantRepo.save(plant);
    }

    public List<Plant> getAllPlants(){
        return plantRepo.findAll();
    }

    public Optional<Plant> getPlantById(long id){
        return plantRepo.findById(id);
    }

    public Plant editPlant(long id, EditPlantRequest editPlantRequest){
        Optional<Plant> foundPlant = plantRepo.findById(id);
        Plant plant = foundPlant.get();
        if(editPlantRequest.getPlantName()!=null){
            plant.setPlantName(editPlantRequest.getPlantName());
        }
        if(editPlantRequest.getWateringFrequency()!=0){
            plant.setWateringFrequency(editPlantRequest.getWateringFrequency());
        }
        if(editPlantRequest.getLastWateredDate()!=null){
            plant.setLastWateredDate(editPlantRequest.getLastWateredDate());
        }
        if(editPlantRequest.getSunlightHours()!=0){
            plant.setSunlightHours(editPlantRequest.getSunlightHours());
        }
        if(editPlantRequest.getFertilizingFrequency()!=0){
            plant.setFertilizingFrequency(editPlantRequest.getFertilizingFrequency());
        }
        if(editPlantRequest.getLastFertilizedDate()!=null){
            plant.setLastFertilizedDate(editPlantRequest.getLastFertilizedDate());
        }

        return plant;
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
