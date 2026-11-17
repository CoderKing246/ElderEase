package com.elderease.dto;
import com.elderease.model.AssistanceRequest;
import com.elderease.model.RequestStatus;
import java.time.LocalDate;
import java.time.LocalTime;
public record RequestResponseDto(Long id, Long seniorId, String requestType, String description,
 LocalDate scheduledDate, LocalTime scheduledTime, Integer durationMinutes, RequestStatus status) {
 public static RequestResponseDto from(AssistanceRequest r) {
  return new RequestResponseDto(r.getId(),r.getSeniorId(),r.getRequestType(),r.getDescription(),
   r.getScheduledDate(),r.getScheduledTime(),r.getDurationMinutes(),r.getStatus());
 }
}
