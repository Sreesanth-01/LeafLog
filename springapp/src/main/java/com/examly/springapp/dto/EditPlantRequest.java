package com.examly.springapp.dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter 
@Setter 
public class EditPlantRequest {
    private String plantName;
    private String wateringFrequency;
    private LocalDate lastWateredDate;
    private int sunlightHours;
    private String fertilizingFrequency;
    private LocalDate lastFertilizedDate;
}
