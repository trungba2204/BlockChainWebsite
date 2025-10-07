package com.blockchain.service;

import com.blockchain.dto.CategoryDTO;
import com.blockchain.entity.Category;
import com.blockchain.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class CategoryService {
    
    @Autowired
    private CategoryRepository categoryRepository;
    
    public List<CategoryDTO> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public List<CategoryDTO> getCategoriesByType(String type) {
        return categoryRepository.findByType(Category.CategoryType.valueOf(type)).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public CategoryDTO getCategoryById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));
        return convertToDTO(category);
    }
    
    public CategoryDTO createCategory(CategoryDTO dto) {
        Category category = convertToEntity(dto);
        Category savedCategory = categoryRepository.save(category);
        return convertToDTO(savedCategory);
    }
    
    public CategoryDTO updateCategory(Long id, CategoryDTO dto) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));
        
        category.setName(dto.getName());
        category.setSlug(dto.getSlug());
        category.setDescription(dto.getDescription());
        category.setType(Category.CategoryType.valueOf(dto.getType()));
        
        Category updatedCategory = categoryRepository.save(category);
        return convertToDTO(updatedCategory);
    }
    
    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }
    
    private CategoryDTO convertToDTO(Category category) {
        CategoryDTO dto = new CategoryDTO();
        dto.setId(category.getId());
        dto.setName(category.getName());
        dto.setSlug(category.getSlug());
        dto.setDescription(category.getDescription());
        dto.setType(category.getType().name());
        dto.setCreatedAt(category.getCreatedAt());
        dto.setUpdatedAt(category.getUpdatedAt());
        return dto;
    }
    
    private Category convertToEntity(CategoryDTO dto) {
        Category category = new Category();
        category.setName(dto.getName());
        category.setSlug(dto.getSlug());
        category.setDescription(dto.getDescription());
        category.setType(Category.CategoryType.valueOf(dto.getType()));
        return category;
    }
}
