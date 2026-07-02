package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import com.examly.springapp.dto.PlantData;
import com.examly.springapp.model.Plant;

public interface PlantService {
    public Plant addPlant(PlantData plantData);
    public List<Plant> getAllPlants();
    public Optional<Plant> getPlantById(long id);
    public void deletePlant(long id);
    public List<Plant> generateCarePlan(String method);
}
