
package com.elderease.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "assistance_requests")
public class AssistanceRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long seniorId;

    @Column(nullable = false)
    private Long familyId;

    private Long helperId;

    @Column(nullable = false)
    private String requestType;

    @Column(length = 1000)
    private String description;

    @Column(nullable = false)
    private LocalDate scheduledDate;

    @Column(nullable = false)
    private LocalTime scheduledTime;

    @Column(nullable = false)
    private Integer durationMinutes;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RequestStatus status;

    protected AssistanceRequest() {}

    public AssistanceRequest(
            Long seniorId,
            Long familyId,
            String requestType,
            String description,
            LocalDate scheduledDate,
            LocalTime scheduledTime,
            Integer durationMinutes) {

        this.seniorId = seniorId;
        this.familyId = familyId;
        this.requestType = requestType;
        this.description = description;
        this.scheduledDate = scheduledDate;
        this.scheduledTime = scheduledTime;
        this.durationMinutes = durationMinutes;
        this.status = RequestStatus.PENDING;
    }

    // Accept a pending request
    public void accept() {
        if (status != RequestStatus.PENDING) {
            throw new IllegalStateException(
                    "Only pending requests can be accepted"
            );
        }

        this.status = RequestStatus.ACCEPTED;
    }

    // Complete an accepted request
    public void complete() {
        if (status != RequestStatus.ACCEPTED) {
            throw new IllegalStateException(
                    "Only accepted requests can be completed"
            );
        }

        this.status = RequestStatus.COMPLETED;
    }

    // Cancel a pending request
    public void cancel() {
        if (status != RequestStatus.PENDING) {
            throw new IllegalStateException(
                    "Only pending requests can be cancelled"
            );
        }

        this.status = RequestStatus.CANCELLED;
    }

    public Long getId() { return id; }
    public Long getSeniorId() { return seniorId; }
    public Long getFamilyId() { return familyId; }
    public Long getHelperId() { return helperId; }
    public String getRequestType() { return requestType; }
    public String getDescription() { return description; }
    public LocalDate getScheduledDate() { return scheduledDate; }
    public LocalTime getScheduledTime() { return scheduledTime; }
    public Integer getDurationMinutes() { return durationMinutes; }
    public RequestStatus getStatus() { return status; }
}
