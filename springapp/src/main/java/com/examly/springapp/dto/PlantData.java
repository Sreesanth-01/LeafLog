package com.examly.springapp.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PlantData {
    public String plantName;
    public int wateringFrequency;
    public int sunlightHours;
    public int fertilizingFrequency;
}
