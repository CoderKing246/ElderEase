package com.elderease.dto;
import jakarta.validation.constraints.*;
import java.time.LocalDate;
import java.time.LocalTime;
public record CreateRequestDto(
 @NotNull Long seniorId,
 @NotBlank String requestType,
 @Size(max=1000) String description,
 @NotNull LocalDate scheduledDate,
 @NotNull LocalTime scheduledTime,
 @NotNull @Min(15) @Max(240) Integer durationMinutes
) {}
