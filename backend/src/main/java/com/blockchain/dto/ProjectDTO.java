package com.blockchain.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class ProjectDTO {
    private Long id;
    private String title;
    private String description;
    private String detailContent;
    private String imageUrl;
    private List<String> additionalImages;
    private Long categoryId;
    private String categoryName;
    private String clientName;
    private String projectUrl;
    private Boolean featured;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
