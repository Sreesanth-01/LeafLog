package com.examly.springapp.model;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Plant {
    public Plant(String plantName, int wateringFrequency, int sunlightHours, int fertilizingFrequency) {
        this.plantName = plantName;
        this.wateringFrequency = wateringFrequency;
        this.sunlightHours = sunlightHours;
        this.fertilizingFrequency = fertilizingFrequency;
        
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String plantName;
    private int wateringFrequency;
    private LocalDate lastWateredDate;
    private int sunlightHours;
    private int fertilizingFrequency;
    private LocalDate lastFertilizedDate;
}
