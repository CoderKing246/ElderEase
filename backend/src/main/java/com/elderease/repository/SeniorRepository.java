package com.elderease.repository;

import com.elderease.model.Senior;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SeniorRepository extends JpaRepository<Senior, Long> {

    List<Senior> findAllByFamilyId(Long familyId);

}