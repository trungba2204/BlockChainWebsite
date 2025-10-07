package com.blockchain.service;

import com.blockchain.dto.BlogDTO;
import com.blockchain.entity.Blog;
import com.blockchain.entity.Category;
import com.blockchain.repository.BlogRepository;
import com.blockchain.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class BlogService {
    
    @Autowired
    private BlogRepository blogRepository;
    
    @Autowired
    private CategoryRepository categoryRepository;
    
    public List<BlogDTO> getAllBlogs() {
        return blogRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public List<BlogDTO> getPublishedBlogs() {
        return blogRepository.findByPublishedTrueOrderByCreatedAtDesc().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public BlogDTO getBlogById(Long id) {
        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Blog not found with id: " + id));
        blog.setViewCount(blog.getViewCount() + 1);
        blogRepository.save(blog);
        return convertToDTO(blog);
    }
    
    public BlogDTO createBlog(BlogDTO blogDTO) {
        Blog blog = convertToEntity(blogDTO);
        Blog savedBlog = blogRepository.save(blog);
        return convertToDTO(savedBlog);
    }
    
    public BlogDTO updateBlog(Long id, BlogDTO blogDTO) {
        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Blog not found with id: " + id));
        
        blog.setTitle(blogDTO.getTitle());
        blog.setSummary(blogDTO.getSummary());
        blog.setContent(blogDTO.getContent());
        blog.setImageUrl(blogDTO.getImageUrl());
        blog.setAuthor(blogDTO.getAuthor());
        blog.setPublished(blogDTO.getPublished());
        
        if (blogDTO.getCategoryId() != null) {
            Category category = categoryRepository.findById(blogDTO.getCategoryId())
                    .orElse(null);
            blog.setCategory(category);
        }
        
        Blog updatedBlog = blogRepository.save(blog);
        return convertToDTO(updatedBlog);
    }
    
    public void deleteBlog(Long id) {
        blogRepository.deleteById(id);
    }
    
    public List<BlogDTO> searchBlogs(String keyword) {
        return blogRepository.findByTitleContainingIgnoreCase(keyword).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    private BlogDTO convertToDTO(Blog blog) {
        BlogDTO dto = new BlogDTO();
        dto.setId(blog.getId());
        dto.setTitle(blog.getTitle());
        dto.setSummary(blog.getSummary());
        dto.setContent(blog.getContent());
        dto.setImageUrl(blog.getImageUrl());
        dto.setAuthor(blog.getAuthor());
        dto.setPublished(blog.getPublished());
        dto.setViewCount(blog.getViewCount());
        dto.setCreatedAt(blog.getCreatedAt());
        dto.setUpdatedAt(blog.getUpdatedAt());
        
        if (blog.getCategory() != null) {
            dto.setCategoryId(blog.getCategory().getId());
            dto.setCategoryName(blog.getCategory().getName());
        }
        
        return dto;
    }
    
    private Blog convertToEntity(BlogDTO dto) {
        Blog blog = new Blog();
        blog.setTitle(dto.getTitle());
        blog.setSummary(dto.getSummary());
        blog.setContent(dto.getContent());
        blog.setImageUrl(dto.getImageUrl());
        blog.setAuthor(dto.getAuthor());
        blog.setPublished(dto.getPublished() != null ? dto.getPublished() : false);
        
        if (dto.getCategoryId() != null) {
            Category category = categoryRepository.findById(dto.getCategoryId())
                    .orElse(null);
            blog.setCategory(category);
        }
        
        return blog;
    }
}
