package com.examly.springapp.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

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
    public Plant(String plantName, String wateringFrequency, LocalDate lastWaterDate,int sunlightHours, String fertilizingFrequency, LocalDate lastFertilizedDate) {
        this.plantName = plantName;
        this.wateringFrequency = wateringFrequency;
        this.lastWateredDate = lastWaterDate;
        this.sunlightHours = sunlightHours;
        this.fertilizingFrequency = fertilizingFrequency;
        this.lastFertilizedDate = lastFertilizedDate;
        
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String plantName;
    private String wateringFrequency;
    private LocalDate lastWateredDate;
    private int sunlightHours;
    private String fertilizingFrequency;
    private LocalDate lastFertilizedDate;

    @ManyToOne (fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;
}
