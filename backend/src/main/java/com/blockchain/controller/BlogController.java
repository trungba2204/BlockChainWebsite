package com.blockchain.controller;

import com.blockchain.dto.BlogDTO;
import com.blockchain.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/blogs")
public class BlogController {
    
    @Autowired
    private BlogService blogService;
    
    @GetMapping("/published")
    public ResponseEntity<List<BlogDTO>> getPublishedBlogs() {
        return ResponseEntity.ok(blogService.getPublishedBlogs());
    }
    
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<BlogDTO>> getAllBlogs() {
        return ResponseEntity.ok(blogService.getAllBlogs());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<BlogDTO> getBlogById(@PathVariable Long id) {
        return ResponseEntity.ok(blogService.getBlogById(id));
    }
    
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<BlogDTO> createBlog(@RequestBody BlogDTO blogDTO) {
        return ResponseEntity.ok(blogService.createBlog(blogDTO));
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<BlogDTO> updateBlog(@PathVariable Long id, @RequestBody BlogDTO blogDTO) {
        return ResponseEntity.ok(blogService.updateBlog(id, blogDTO));
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteBlog(@PathVariable Long id) {
        blogService.deleteBlog(id);
        return ResponseEntity.ok().build();
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<BlogDTO>> searchBlogs(@RequestParam String keyword) {
        return ResponseEntity.ok(blogService.searchBlogs(keyword));
    }
}
