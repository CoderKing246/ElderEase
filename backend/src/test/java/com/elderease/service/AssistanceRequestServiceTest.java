
package com.elderease.service;

import com.elderease.dto.CreateRequestDto;
import com.elderease.model.*;
import com.elderease.repository.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.server.ResponseStatusException;

import java.time.*;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AssistanceRequestServiceTest {

    @Mock
    SeniorRepository seniorRepository;

    @Mock
    AssistanceRequestRepository requestRepository;

    @InjectMocks
    AssistanceRequestService service;

    private CreateRequestDto valid;

    @BeforeEach
    void setUp() {
        valid = new CreateRequestDto(
                10L,
                "GROCERY",
                "Buy essentials",
                LocalDate.now().plusDays(1),
                LocalTime.of(17, 0),
                60
        );
    }

    private AssistanceRequest createRequest() {
        return new AssistanceRequest(
                10L,
                7L,
                "GROCERY",
                "Buy essentials",
                LocalDate.now().plusDays(1),
                LocalTime.of(17, 0),
                60
        );
    }

    // 1. CREATE REQUEST TESTS

    @Test
    void createsPendingRequestWhenInputIsValid() {
        when(seniorRepository.findById(10L))
                .thenReturn(Optional.of(new Senior(10L, 7L)));

        when(requestRepository.save(any()))
                .thenAnswer(inv -> inv.getArgument(0));

        var result = service.createRequest(7L, valid);

        assertEquals(RequestStatus.PENDING, result.getStatus());
        assertEquals(7L, result.getFamilyId());

        verify(requestRepository).save(any());
    }

    @Test
    void rejectsUnknownSenior() {
        when(seniorRepository.findById(10L))
                .thenReturn(Optional.empty());

        assertThrows(
                RequestValidationException.class,
                () -> service.createRequest(7L, valid)
        );

        verify(requestRepository, never()).save(any());
    }

    @Test
    void rejectsSeniorOwnedByAnotherFamily() {
        when(seniorRepository.findById(10L))
                .thenReturn(Optional.of(new Senior(10L, 99L)));

        assertThrows(
                RequestValidationException.class,
                () -> service.createRequest(7L, valid)
        );

        verify(requestRepository, never()).save(any());
    }

    @Test
    void rejectsPastDate() {
        when(seniorRepository.findById(10L))
                .thenReturn(Optional.of(new Senior(10L, 7L)));

        var dto = new CreateRequestDto(
                10L, "GROCERY", "",
                LocalDate.now().minusDays(1),
                LocalTime.NOON, 60
        );

        assertThrows(
                RequestValidationException.class,
                () -> service.createRequest(7L, dto)
        );

        verify(requestRepository, never()).save(any());
    }

    @Test
    void rejectsDurationOutsideAllowedRange() {
        when(seniorRepository.findById(10L))
                .thenReturn(Optional.of(new Senior(10L, 7L)));

        var dto = new CreateRequestDto(
                10L, "GROCERY", "",
                LocalDate.now().plusDays(1),
                LocalTime.NOON, 300
        );

        assertThrows(
                RequestValidationException.class,
                () -> service.createRequest(7L, dto)
        );

        verify(requestRepository, never()).save(any());
    }

    // 2. REQUEST RETRIEVAL TESTS

    @Test
    void retrievesRequestsForFamily() {
        var request = createRequest();

        when(requestRepository.findAllByFamilyId(7L))
                .thenReturn(List.of(request));

        var result = service.getRequestsByFamily(7L);

        assertEquals(1, result.size());
        assertEquals(7L, result.get(0).getFamilyId());
    }

    @Test
    void retrievesRequestOwnedByFamily() {
        var request = createRequest();

        when(requestRepository.findById(1L))
                .thenReturn(Optional.of(request));

        var result = service.getRequestById(1L, 7L);

        assertNotNull(result);
        assertEquals(7L, result.getFamilyId());
    }

    @Test
    void rejectsRetrievalOfNonexistentRequest() {
        when(requestRepository.findById(999L))
                .thenReturn(Optional.empty());

        var exception = assertThrows(
                ResponseStatusException.class,
                () -> service.getRequestById(999L, 7L)
        );

        assertEquals(404, exception.getStatusCode().value());
    }

    @Test
    void rejectsRequestAccessByAnotherFamily() {
        var request = createRequest();

        when(requestRepository.findById(1L))
                .thenReturn(Optional.of(request));

        var exception = assertThrows(
                ResponseStatusException.class,
                () -> service.getRequestById(1L, 99L)
        );

        assertEquals(403, exception.getStatusCode().value());
    }

    // 3. REQUEST STATUS TRANSITION TESTS

    @Test
    void acceptsPendingRequest() {
        var request = createRequest();

        when(requestRepository.findById(1L))
                .thenReturn(Optional.of(request));

        when(requestRepository.save(any()))
                .thenAnswer(inv -> inv.getArgument(0));

        var result = service.acceptRequest(1L, 7L);

        assertEquals(RequestStatus.ACCEPTED, result.getStatus());
    }

    @Test
    void completesAcceptedRequest() {
        var request = createRequest();
        request.accept();

        when(requestRepository.findById(1L))
                .thenReturn(Optional.of(request));

        when(requestRepository.save(any()))
                .thenAnswer(inv -> inv.getArgument(0));

        var result = service.completeRequest(1L, 7L);

        assertEquals(RequestStatus.COMPLETED, result.getStatus());
    }

    @Test
    void cancelsPendingRequest() {
        var request = createRequest();

        when(requestRepository.findById(1L))
                .thenReturn(Optional.of(request));

        when(requestRepository.save(any()))
                .thenAnswer(inv -> inv.getArgument(0));

        var result = service.cancelRequest(1L, 7L);

        assertEquals(RequestStatus.CANCELLED, result.getStatus());
    }

    @Test
    void rejectsAcceptingAlreadyAcceptedRequest() {
        var request = createRequest();
        request.accept();

        when(requestRepository.findById(1L))
                .thenReturn(Optional.of(request));

        var exception = assertThrows(
                ResponseStatusException.class,
                () -> service.acceptRequest(1L, 7L)
        );

        assertEquals(409, exception.getStatusCode().value());
    }

    @Test
    void rejectsCompletingPendingRequest() {
        var request = createRequest();

        when(requestRepository.findById(1L))
                .thenReturn(Optional.of(request));

        var exception = assertThrows(
                ResponseStatusException.class,
                () -> service.completeRequest(1L, 7L)
        );

        assertEquals(409, exception.getStatusCode().value());
    }

    @Test
    void rejectsCancellingAcceptedRequest() {
        var request = createRequest();
        request.accept();

        when(requestRepository.findById(1L))
                .thenReturn(Optional.of(request));

        var exception = assertThrows(
                ResponseStatusException.class,
                () -> service.cancelRequest(1L, 7L)
        );

        assertEquals(409, exception.getStatusCode().value());
    }
}
