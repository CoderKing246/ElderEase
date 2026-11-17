package com.elderease.dto;

import jakarta.validation.constraints.*;

public record CreateSeniorRequest(

        @NotNull
        @Positive
        Long familyId,

        @NotBlank
        @Size(max = 100)
        String name,

        @NotNull
        @Min(60)
        @Max(120)
        Integer age,

        @NotBlank
        @Size(max = 255)
        String address,

        @NotBlank
        @Pattern(regexp = "^[0-9+() -]{7,15}$")
        String phone

) {}