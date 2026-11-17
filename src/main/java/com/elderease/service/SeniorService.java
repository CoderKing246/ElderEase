package com.elderease.service;

import com.elderease.dto.CreateSeniorRequest;
import com.elderease.dto.SeniorResponse;
import com.elderease.model.Senior;
import com.elderease.repository.SeniorRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class SeniorService {

    private final SeniorRepository seniorRepository;

    public SeniorService(SeniorRepository seniorRepository) {
        this.seniorRepository = seniorRepository;
    }

    // Create a senior profile
    public SeniorResponse createSenior(CreateSeniorRequest request) {

        Senior senior = new Senior(
                request.familyId(),
                request.name(),
                request.age(),
                request.address(),
                request.phone()
        );

        Senior savedSenior = seniorRepository.save(senior);

        return mapToResponse(savedSenior);
    }

    // Get all seniors belonging to a family
    public List<SeniorResponse> getSeniorsByFamily(Long familyId) {

        return seniorRepository.findAllByFamilyId(familyId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // Get a senior by ID after checking family ownership
    public SeniorResponse getSeniorById(Long seniorId, Long familyId) {

        Senior senior = seniorRepository.findById(seniorId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Senior not found"
                ));

        if (!senior.getFamilyId().equals(familyId)) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "You are not authorized to access this senior profile"
            );
        }

        return mapToResponse(senior);
    }

    // Convert entity into response DTO
    private SeniorResponse mapToResponse(Senior senior) {

        return new SeniorResponse(
                senior.getId(),
                senior.getFamilyId(),
                senior.getName(),
                senior.getAge(),
                senior.getAddress(),
                senior.getPhone()
        );
    }
}