package com.blockchain.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "careers")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Career {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(columnDefinition = "LONGTEXT")
    private String requirements;
    
    @Column(columnDefinition = "LONGTEXT")
    private String responsibilities;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private JobType jobType = JobType.FULL_TIME;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private WorkLocation workLocation = WorkLocation.ON_SITE;
    
    private String location;
    
    private String salaryRange;
    
    @Column(nullable = false)
    private Boolean active = true;
    
    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    private LocalDateTime updatedAt;
    
    public enum JobType {
        FULL_TIME, PART_TIME, CONTRACT, INTERNSHIP
    }
    
    public enum WorkLocation {
        ON_SITE, REMOTE, HYBRID
    }
}
