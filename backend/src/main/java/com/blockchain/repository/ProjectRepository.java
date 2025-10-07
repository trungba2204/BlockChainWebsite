package com.blockchain.repository;

import com.blockchain.entity.Project;
import com.blockchain.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByFeaturedTrue();
    List<Project> findByCategory(Category category);
    List<Project> findByOrderByCreatedAtDesc();
    List<Project> findByTitleContainingIgnoreCase(String keyword);
}
