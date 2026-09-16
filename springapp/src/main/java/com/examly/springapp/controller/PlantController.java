package com.examly.springapp.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.dto.EditPlantRequest;
import com.examly.springapp.dto.PlantRequest;
import com.examly.springapp.model.Plant;
import com.examly.springapp.service.PlantService;

@RestController
@RequestMapping("/api")
public class PlantController {
    private final PlantService plantService;

    public PlantController(PlantService plantService){
        this.plantService = plantService;
    }

    @PostMapping("/plants")
    public ResponseEntity<Plant> addPlant(@RequestBody PlantRequest plantData, @AuthenticationPrincipal  String email){
        return new ResponseEntity<>(plantService.addPlant(plantData,email), HttpStatus.OK);
    }

    @GetMapping("/plants")
    public ResponseEntity<List<Plant>> getAllPlants(@AuthenticationPrincipal  String email){
        return new ResponseEntity<>(plantService.getAllPlants(email),HttpStatus.OK);
    }

    @GetMapping("/plants/{id}")
    public ResponseEntity<Plant> getPlantById(@PathVariable long id, @AuthenticationPrincipal String email){
        return new ResponseEntity<>(plantService.getPlantById(id,email).get(),HttpStatus.OK);
    }
    
    @PutMapping("/plants/{id}")
    public ResponseEntity<Plant> editPlant(@PathVariable long id,@RequestBody EditPlantRequest editPlantRequest, @AuthenticationPrincipal  String email){
        Plant editedPlant = plantService.editPlant(id, editPlantRequest, email);
        return  new ResponseEntity<>(editedPlant,HttpStatus.OK);
    }

    @DeleteMapping("/plants/{id}")
    public ResponseEntity<String> deletePlant(@PathVariable long id,  @AuthenticationPrincipal  String email){
        Optional<Plant> plant = plantService.getPlantById(id,email);
        if(plant.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        plantService.deletePlant(id,email);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/plants/plan")
    public ResponseEntity<List<Plant>> generateCarePlan(@RequestParam(required = false) String method,  @AuthenticationPrincipal  String email){
        
        List<Plant> carePlan = plantService.generateCarePlan(method,email);
        if(carePlan == null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(carePlan,HttpStatus.OK);
       
    }
}
