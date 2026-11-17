package com.elderease.dto;

public record SeniorResponse(
        Long id,
        Long familyId,
        String name,
        Integer age,
        String address,
        String phone
) {}