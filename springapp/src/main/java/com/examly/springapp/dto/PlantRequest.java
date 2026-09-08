package com.examly.springapp.dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PlantRequest {
    private String plantName;
    private int wateringFrequency;
    private LocalDate lastWateredDate;
    private int sunlightHours;
    private int fertilizingFrequency;
    private LocalDate lastFertilizedDate;
}
