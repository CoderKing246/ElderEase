package com.elderease.service;

import com.elderease.dto.CreateSeniorRequest;
import com.elderease.dto.SeniorResponse;
import com.elderease.model.Senior;
import com.elderease.repository.SeniorRepository;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class SeniorServiceTest {

    @Mock
    private SeniorRepository seniorRepository;

    @InjectMocks
    private SeniorService seniorService;

    @Test
    void shouldCreateSeniorSuccessfully() {

        CreateSeniorRequest request = new CreateSeniorRequest(
                7L, "Ramesh Kumar", 72,
                "Delhi", "9876543210"
        );

        when(seniorRepository.save(any(Senior.class)))
                .thenAnswer(invocation -> {
                    Senior senior = invocation.getArgument(0);
                    ReflectionTestUtils.setField(senior, "id", 100L);
                    return senior;
                });

        SeniorResponse response = seniorService.createSenior(request);

        assertEquals(100L, response.id());
        assertEquals(7L, response.familyId());
        assertEquals("Ramesh Kumar", response.name());
        assertEquals(72, response.age());

        verify(seniorRepository).save(any(Senior.class));
    }

    @Test
    void shouldReturnSeniorsBelongingToFamily() {

        Senior senior = new Senior(
                7L, "Ramesh Kumar", 72,
                "Delhi", "9876543210"
        );

        when(seniorRepository.findAllByFamilyId(7L))
                .thenReturn(List.of(senior));

        List<SeniorResponse> response =
                seniorService.getSeniorsByFamily(7L);

        assertEquals(1, response.size());
        assertEquals("Ramesh Kumar", response.get(0).name());

        verify(seniorRepository).findAllByFamilyId(7L);
    }

    @Test
    void shouldThrowExceptionWhenSeniorDoesNotExist() {

        when(seniorRepository.findById(100L))
                .thenReturn(Optional.empty());

        ResponseStatusException exception = assertThrows(
                ResponseStatusException.class,
                () -> seniorService.getSeniorById(100L, 7L)
        );

        assertEquals(HttpStatus.NOT_FOUND, exception.getStatusCode());
    }

    @Test
    void shouldRejectAccessToAnotherFamilySenior() {

        Senior senior = new Senior(
                8L, "Suresh Kumar", 75,
                "Gurgaon", "9876543210"
        );

        when(seniorRepository.findById(100L))
                .thenReturn(Optional.of(senior));

        ResponseStatusException exception = assertThrows(
                ResponseStatusException.class,
                () -> seniorService.getSeniorById(100L, 7L)
        );

        assertEquals(HttpStatus.FORBIDDEN, exception.getStatusCode());
    }
}