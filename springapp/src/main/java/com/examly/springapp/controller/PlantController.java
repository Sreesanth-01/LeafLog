package com.examly.springapp.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
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

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;


@Tag(
    name = "Plant Management",
    description = "APIs for managing plants and generating care plans"
)
@RestController
@RequestMapping("/api")
public class PlantController {
    private final PlantService plantService;

    public PlantController(PlantService plantService){
        this.plantService = plantService;
    }

     @Operation(
        summary = "Add a plant",
        description = "Creates a new plant for the authenticated user"
    )
    @PostMapping("/plants")
    public ResponseEntity<Plant> addPlant(@RequestBody PlantRequest plantData, @AuthenticationPrincipal  UserDetails userDetails){
        return new ResponseEntity<>(plantService.addPlant(plantData,userDetails.getUsername()), HttpStatus.OK);
    }

     @Operation(
        summary = "Get all plants",
        description = "Returns all plants belonging to the authenticated user"
    )
    @GetMapping("/plants")
    public ResponseEntity<List<Plant>> getAllPlants(@AuthenticationPrincipal  UserDetails userDetails){
        return new ResponseEntity<>(plantService.getAllPlants(userDetails.getUsername()),HttpStatus.OK);
    }

     @Operation(
        summary = "Get plant by ID",
        description = "Returns a specific plant belonging to the authenticated user"
    )
    @GetMapping("/plants/{id}")
    public ResponseEntity<Plant> getPlantById(@PathVariable long id, @AuthenticationPrincipal UserDetails userDetails){
        return new ResponseEntity<>(plantService.getPlantById(id,userDetails.getUsername()).get(),HttpStatus.OK);
    }
    
     @Operation(
        summary = "Edit a plant",
        description = "Updates an existing plant belonging to the user"
    )
    @PutMapping("/plants/{id}")
    public ResponseEntity<Plant> editPlant(@PathVariable long id,@RequestBody EditPlantRequest editPlantRequest, @AuthenticationPrincipal  UserDetails userDetails){
        Plant editedPlant = plantService.editPlant(id, editPlantRequest, userDetails.getUsername());
        return  new ResponseEntity<>(editedPlant,HttpStatus.OK);
    }

     @Operation(
        summary = "Delete a plant",
        description = "Deletes a plant belonging to the user"
    )
    @DeleteMapping("/plants/{id}")
    public ResponseEntity<String> deletePlant(@PathVariable long id,  @AuthenticationPrincipal  UserDetails userDetails){
        Optional<Plant> plant = plantService.getPlantById(id,userDetails.getUsername());
        if(plant.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        plantService.deletePlant(id,userDetails.getUsername());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @Operation(
        summary = "Generate care plan",
        description = "Generates a care plan based on the selected method: water or sunlight"
    )
    @GetMapping("/plants/plan")
    public ResponseEntity<List<Plant>> generateCarePlan(@RequestParam(required = false) String method,  @AuthenticationPrincipal  UserDetails userDetails){
        
        List<Plant> carePlan = plantService.generateCarePlan(method,userDetails.getUsername());
        if(carePlan == null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(carePlan,HttpStatus.OK);
       
    }
}
