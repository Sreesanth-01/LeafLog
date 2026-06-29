package com.examly.springapp.service;

import com.examly.springapp.dto.PlantData;
import com.examly.springapp.model.Plant;

public interface PlantService {
    public Plant addPlant(PlantData plantData);
}
