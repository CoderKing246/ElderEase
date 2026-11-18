
package com.elderease.service;

import com.elderease.dto.CreateRequestDto;
import com.elderease.model.AssistanceRequest;
import com.elderease.repository.AssistanceRequestRepository;
import com.elderease.repository.SeniorRepository;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;

@Service
public class AssistanceRequestService {

    private final SeniorRepository seniorRepository;
    private final AssistanceRequestRepository requestRepository;

    public AssistanceRequestService(
            SeniorRepository seniorRepository,
            AssistanceRequestRepository requestRepository) {

        this.seniorRepository = seniorRepository;
        this.requestRepository = requestRepository;
    }

    // Create an assistance request
    @Transactional
    public AssistanceRequest createRequest(
            Long authenticatedFamilyId,
            CreateRequestDto dto) {

        var senior = seniorRepository.findById(dto.seniorId())
                .orElseThrow(() ->
                        new RequestValidationException(
                                "Senior profile not found"
                        ));

        if (!senior.getFamilyId().equals(authenticatedFamilyId)) {
            throw new RequestValidationException(
                    "You are not allowed to create a request for this senior"
            );
        }

        if (dto.scheduledDate().isBefore(LocalDate.now())) {
            throw new RequestValidationException(
                    "Scheduled date cannot be in the past"
            );
        }

        if (dto.durationMinutes() < 15 ||
                dto.durationMinutes() > 240) {

            throw new RequestValidationException(
                    "Duration must be between 15 and 240 minutes"
            );
        }

        AssistanceRequest request = new AssistanceRequest(
                senior.getId(),
                authenticatedFamilyId,
                dto.requestType(),
                dto.description(),
                dto.scheduledDate(),
                dto.scheduledTime(),
                dto.durationMinutes()
        );

        return requestRepository.save(request);
    }

    // Retrieve all requests belonging to a family
    public List<AssistanceRequest> getRequestsByFamily(Long familyId) {

        return requestRepository.findAllByFamilyId(familyId);
    }

    // Retrieve a specific request with ownership verification
    public AssistanceRequest getRequestById(
            Long requestId,
            Long familyId) {

        AssistanceRequest request = findRequest(requestId);

        verifyFamilyOwnership(request, familyId);

        return request;
    }

    // Accept a pending request
    @Transactional
    public AssistanceRequest acceptRequest(
            Long requestId,
            Long familyId) {

        AssistanceRequest request = findRequest(requestId);

        verifyFamilyOwnership(request, familyId);

        try {
            request.accept();
        } catch (IllegalStateException exception) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    exception.getMessage()
            );
        }

        return requestRepository.save(request);
    }

    // Complete an accepted request
    @Transactional
    public AssistanceRequest completeRequest(
            Long requestId,
            Long familyId) {

        AssistanceRequest request = findRequest(requestId);

        verifyFamilyOwnership(request, familyId);

        try {
            request.complete();
        } catch (IllegalStateException exception) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    exception.getMessage()
            );
        }

        return requestRepository.save(request);
    }

    // Cancel a pending request
    @Transactional
    public AssistanceRequest cancelRequest(
            Long requestId,
            Long familyId) {

        AssistanceRequest request = findRequest(requestId);

        verifyFamilyOwnership(request, familyId);

        try {
            request.cancel();
        } catch (IllegalStateException exception) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    exception.getMessage()
            );
        }

        return requestRepository.save(request);
    }

    // Find request or return 404
    private AssistanceRequest findRequest(Long requestId) {

        return requestRepository.findById(requestId)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Assistance request not found"
                        ));
    }

    // Verify family ownership
    private void verifyFamilyOwnership(
            AssistanceRequest request,
            Long familyId) {

        if (!request.getFamilyId().equals(familyId)) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "You are not authorized to access this request"
            );
        }
    }
}
