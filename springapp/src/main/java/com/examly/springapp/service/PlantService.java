package com.examly.springapp.service;

import java.util.List;

import com.examly.springapp.dto.PlantData;
import com.examly.springapp.model.Plant;

public interface PlantService {
    public Plant addPlant(PlantData plantData);
    public List<Plant> getAllPlants();
}
