package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.examly.springapp.dto.EditPlantRequest;
import com.examly.springapp.dto.PlantRequest;
import com.examly.springapp.model.Plant;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.PlantRepo;
import com.examly.springapp.repository.UserRepo;

@Service
public class PlantService {
    private final PlantRepo plantRepo;
    private  final UserRepo userRepo;

    public PlantService(PlantRepo plantRepo, UserRepo userRepo){
        this.plantRepo = plantRepo;
        this.userRepo = userRepo;
    }

    public Plant addPlant(PlantRequest plantData, String email){

        User user = userRepo.findByEmail(email).orElseThrow(()-> new RuntimeException("User NOT found"));

        Plant plant = new Plant();
        plant.setPlantName(plantData.getPlantName());
        plant.setWateringFrequency(plantData.getWateringFrequency());
        plant.setLastWateredDate(plantData.getLastWateredDate());
        plant.setSunlightHours(plantData.getSunlightHours());
        plant.setFertilizingFrequency(plantData.getFertilizingFrequency());
        plant.setLastFertilizedDate(plantData.getLastFertilizedDate());
        plant.setUser(user);

        return plantRepo.save(plant);
    }

    public List<Plant> getAllPlants(String email){
         User user = userRepo.findByEmail(email).orElseThrow(()-> new RuntimeException("User NOT found"));
        return plantRepo.findByUser(user);
    }

    public Optional<Plant> getPlantById(long id, String email){
        User user = userRepo.findByEmail(email).orElseThrow(()-> new RuntimeException("User NOT found"));
        return plantRepo.findByIdAndUser(id,user);
    }

    public Plant editPlant(long id, EditPlantRequest editPlantRequest, String email){
         User user = userRepo.findByEmail(email).orElseThrow(()-> new RuntimeException("User NOT found"));
        Optional<Plant> foundPlant = plantRepo.findByIdAndUser(id,user);
        Plant plant = foundPlant.get();
        if(editPlantRequest.getPlantName()!=null){
            plant.setPlantName(editPlantRequest.getPlantName());
        }
        if(editPlantRequest.getWateringFrequency()!=null){
            plant.setWateringFrequency(editPlantRequest.getWateringFrequency());
        }
        if(editPlantRequest.getLastWateredDate()!=null){
            plant.setLastWateredDate(editPlantRequest.getLastWateredDate());
        }
        if(editPlantRequest.getSunlightHours()!=0){
            plant.setSunlightHours(editPlantRequest.getSunlightHours());
        }
        if(editPlantRequest.getFertilizingFrequency()!=null){
            plant.setFertilizingFrequency(editPlantRequest.getFertilizingFrequency());
        }
        if(editPlantRequest.getLastFertilizedDate()!=null){
            plant.setLastFertilizedDate(editPlantRequest.getLastFertilizedDate());
        }

        return plantRepo.save(plant);
    }

    public void deletePlant(long id, String email){
        User user = userRepo.findByEmail(email).orElseThrow(()-> new RuntimeException("User NOT found"));
        Plant plant = plantRepo.findByIdAndUser(id, user).orElseThrow(()-> new RuntimeException("Plant not found"));
        plantRepo.delete(plant);
        
    }

    public List<Plant> generateCarePlan(String method, String email){
        User user = userRepo.findByEmail(email).orElseThrow(()-> new RuntimeException("User NOT found"));
        Sort sort;
        if(method.equals("water")){
            sort = Sort.by("wateringFrequency").ascending();
        }
        else if(method.equals("sunlight")){
            sort = Sort.by("sunlightHours").descending();
        }
        else{
            return plantRepo.findAllByUser(user);
        }
        return plantRepo.findAll(sort);


    }
}
