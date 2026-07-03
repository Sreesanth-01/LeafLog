package com.examly.springapp.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PlantRequest {
    private String plantName;
    private int wateringFrequency;
    private int sunlightHours;
    private int fertilizingFrequency;
}
