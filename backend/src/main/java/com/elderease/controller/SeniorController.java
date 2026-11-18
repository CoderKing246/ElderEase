package com.elderease.controller;

import com.elderease.dto.CreateSeniorRequest;
import com.elderease.dto.SeniorResponse;
import com.elderease.service.SeniorService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/seniors")
public class SeniorController {

    private final SeniorService seniorService;

    public SeniorController(SeniorService seniorService) {
        this.seniorService = seniorService;
    }

    // Create a senior profile
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public SeniorResponse createSenior(
            @Valid @RequestBody CreateSeniorRequest request) {

        return seniorService.createSenior(request);
    }

    // Get all seniors belonging to a family
    @GetMapping
    public List<SeniorResponse> getSeniorsByFamily(
            @RequestParam Long familyId) {

        return seniorService.getSeniorsByFamily(familyId);
    }

    // Get a particular senior
    @GetMapping("/{seniorId}")
    public SeniorResponse getSeniorById(
            @PathVariable Long seniorId,
            @RequestParam Long familyId) {

        return seniorService.getSeniorById(seniorId, familyId);
    }
}