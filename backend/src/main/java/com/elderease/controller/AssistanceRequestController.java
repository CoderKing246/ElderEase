
package com.elderease.controller;

import com.elderease.dto.CreateRequestDto;
import com.elderease.dto.RequestResponseDto;
import com.elderease.service.AssistanceRequestService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
public class AssistanceRequestController {

    private final AssistanceRequestService service;

    public AssistanceRequestController(AssistanceRequestService service) {
        this.service = service;
    }

    // Create a new assistance request
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public RequestResponseDto create(
            @RequestParam Long familyId,
            @Valid @RequestBody CreateRequestDto dto) {

        return RequestResponseDto.from(
                service.createRequest(familyId, dto)
        );
    }

    // Get all requests belonging to a family
    @GetMapping
    public List<RequestResponseDto> getRequests(
            @RequestParam Long familyId) {

        return service.getRequestsByFamily(familyId)
                .stream()
                .map(RequestResponseDto::from)
                .toList();
    }

    // Get a particular request
    @GetMapping("/{requestId}")
    public RequestResponseDto getRequest(
            @PathVariable Long requestId,
            @RequestParam Long familyId) {

        return RequestResponseDto.from(
                service.getRequestById(requestId, familyId)
        );
    }

    // Accept a pending request
    @PatchMapping("/{requestId}/accept")
    public RequestResponseDto acceptRequest(
            @PathVariable Long requestId,
            @RequestParam Long familyId) {

        return RequestResponseDto.from(
                service.acceptRequest(requestId, familyId)
        );
    }

    // Complete an accepted request
    @PatchMapping("/{requestId}/complete")
    public RequestResponseDto completeRequest(
            @PathVariable Long requestId,
            @RequestParam Long familyId) {

        return RequestResponseDto.from(
                service.completeRequest(requestId, familyId)
        );
    }

    // Cancel a pending request
    @PatchMapping("/{requestId}/cancel")
    public RequestResponseDto cancelRequest(
            @PathVariable Long requestId,
            @RequestParam Long familyId) {

        return RequestResponseDto.from(
                service.cancelRequest(requestId, familyId)
        );
    }
}
