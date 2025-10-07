package com.blockchain.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BlogDTO {
    private Long id;
    private String title;
    private String summary;
    private String content;
    private String imageUrl;
    private String author;
    private Long categoryId;
    private String categoryName;
    private Boolean published;
    private Integer viewCount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
