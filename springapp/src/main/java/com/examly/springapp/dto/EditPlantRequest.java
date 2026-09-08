package com.examly.springapp.dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter 
@Setter 
public class EditPlantRequest {
    public String plantName;
    public int wateringFrequency;
    public LocalDate lastWateredDate;
    public int sunlightHours;
    public int fertilizingFrequency;
    public LocalDate lastFertilizedDate;
}
