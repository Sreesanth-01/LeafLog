package com.examly.springapp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import com.examly.springapp.model.Plant;
import com.examly.springapp.model.User;

public interface PlantRepo extends JpaRepository<Plant,Long> {

    List<Plant> findByUser(User user);

    Optional<Plant> findByIdAndUser(long id, User user);

    List<Plant> findAllByUser(User user);
}
