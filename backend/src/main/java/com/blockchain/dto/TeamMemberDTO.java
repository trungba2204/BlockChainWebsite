package com.blockchain.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TeamMemberDTO {
    private Long id;
    private String fullName;
    private String position;
    private String bio;
    private String imageUrl;
    private String email;
    private String linkedin;
    private String twitter;
    private Integer displayOrder;
    private Boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
