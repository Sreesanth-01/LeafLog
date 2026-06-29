package com.examly.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examly.springapp.model.Plant;

public interface PlantRepo extends JpaRepository<Plant,Long> {
    
}
