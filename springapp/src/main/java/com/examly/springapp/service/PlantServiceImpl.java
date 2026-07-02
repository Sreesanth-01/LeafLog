package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
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
    @Override
    public Plant addPlant(PlantData plantData){
        Plant plant = new Plant();
        plant.setPlantName(plantData.getPlantName());
        plant.setWateringFrequency(plantData.getWateringFrequency());
        plant.setSunlightHours(plantData.getSunlightHours());
        plant.setFertilizingFrequency(plantData.getFertilizingFrequency());

        return plantRepo.save(plant);
    }
    @Override
    public List<Plant> getAllPlants(){
        return plantRepo.findAll();
    }
    @Override
    public Optional<Plant> getPlantById(long id){
        return plantRepo.findById(id);
    }
    @Override
    public void deletePlant(long id){
        plantRepo.deleteById(id);
    }
    @Override
    public List<Plant> generateCarePlan(String method){
        Sort sort;
        if(method.equals("water")){
            sort = Sort.by("wateringFrequency").ascending();
        }
        else{
            sort = Sort.by("sunlightHours").descending();
        }
        return plantRepo.findAll(sort);


    }
}
