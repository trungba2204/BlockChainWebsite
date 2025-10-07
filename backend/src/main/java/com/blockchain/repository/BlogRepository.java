package com.blockchain.repository;

import com.blockchain.entity.Blog;
import com.blockchain.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Long> {
    List<Blog> findByPublishedTrue();
    List<Blog> findByCategory(Category category);
    List<Blog> findByPublishedTrueOrderByCreatedAtDesc();
    List<Blog> findByTitleContainingIgnoreCase(String keyword);
}
