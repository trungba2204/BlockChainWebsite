package com.blockchain.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CategoryDTO {
    private Long id;
    private String name;
    private String slug;
    private String description;
    private String type;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
