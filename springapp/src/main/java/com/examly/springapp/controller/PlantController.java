package com.examly.springapp.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.dto.PlantData;
import com.examly.springapp.model.Plant;
import com.examly.springapp.service.PlantServiceImpl;

@RestController
@RequestMapping("/api")
public class PlantController {
    private final PlantServiceImpl plantService;

    public PlantController(PlantServiceImpl plantService){
        this.plantService = plantService;
    }
    @PostMapping("/plants")
    public ResponseEntity<Plant> addPlant(@RequestBody PlantData plantData){
        return new ResponseEntity<>(plantService.addPlant(plantData), HttpStatus.OK);
    }

    @GetMapping("/plants")
    public ResponseEntity<List<Plant>> getAllPlants(){
        return new ResponseEntity<>(plantService.getAllPlants(),HttpStatus.OK);
    }
}
