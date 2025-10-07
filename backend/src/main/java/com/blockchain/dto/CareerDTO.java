package com.blockchain.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CareerDTO {
    private Long id;
    private String title;
    private String description;
    private String requirements;
    private String responsibilities;
    private String jobType;
    private String workLocation;
    private String location;
    private String salaryRange;
    private Boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
