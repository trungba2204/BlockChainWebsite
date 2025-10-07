package com.blockchain.service;

import com.blockchain.dto.ProjectDTO;
import com.blockchain.entity.Category;
import com.blockchain.entity.Project;
import com.blockchain.repository.CategoryRepository;
import com.blockchain.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ProjectService {
    
    @Autowired
    private ProjectRepository projectRepository;
    
    @Autowired
    private CategoryRepository categoryRepository;
    
    public List<ProjectDTO> getAllProjects() {
        return projectRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public List<ProjectDTO> getFeaturedProjects() {
        return projectRepository.findByFeaturedTrue().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public ProjectDTO getProjectById(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));
        return convertToDTO(project);
    }
    
    public ProjectDTO createProject(ProjectDTO projectDTO) {
        Project project = convertToEntity(projectDTO);
        Project savedProject = projectRepository.save(project);
        return convertToDTO(savedProject);
    }
    
    public ProjectDTO updateProject(Long id, ProjectDTO projectDTO) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));
        
        project.setTitle(projectDTO.getTitle());
        project.setDescription(projectDTO.getDescription());
        project.setDetailContent(projectDTO.getDetailContent());
        project.setImageUrl(projectDTO.getImageUrl());
        project.setAdditionalImages(projectDTO.getAdditionalImages());
        project.setClientName(projectDTO.getClientName());
        project.setProjectUrl(projectDTO.getProjectUrl());
        project.setFeatured(projectDTO.getFeatured());
        
        if (projectDTO.getCategoryId() != null) {
            Category category = categoryRepository.findById(projectDTO.getCategoryId())
                    .orElse(null);
            project.setCategory(category);
        }
        
        Project updatedProject = projectRepository.save(project);
        return convertToDTO(updatedProject);
    }
    
    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }
    
    private ProjectDTO convertToDTO(Project project) {
        ProjectDTO dto = new ProjectDTO();
        dto.setId(project.getId());
        dto.setTitle(project.getTitle());
        dto.setDescription(project.getDescription());
        dto.setDetailContent(project.getDetailContent());
        dto.setImageUrl(project.getImageUrl());
        dto.setAdditionalImages(project.getAdditionalImages());
        dto.setClientName(project.getClientName());
        dto.setProjectUrl(project.getProjectUrl());
        dto.setFeatured(project.getFeatured());
        dto.setCreatedAt(project.getCreatedAt());
        dto.setUpdatedAt(project.getUpdatedAt());
        
        if (project.getCategory() != null) {
            dto.setCategoryId(project.getCategory().getId());
            dto.setCategoryName(project.getCategory().getName());
        }
        
        return dto;
    }
    
    private Project convertToEntity(ProjectDTO dto) {
        Project project = new Project();
        project.setTitle(dto.getTitle());
        project.setDescription(dto.getDescription());
        project.setDetailContent(dto.getDetailContent());
        project.setImageUrl(dto.getImageUrl());
        project.setAdditionalImages(dto.getAdditionalImages());
        project.setClientName(dto.getClientName());
        project.setProjectUrl(dto.getProjectUrl());
        project.setFeatured(dto.getFeatured() != null ? dto.getFeatured() : false);
        
        if (dto.getCategoryId() != null) {
            Category category = categoryRepository.findById(dto.getCategoryId())
                    .orElse(null);
            project.setCategory(category);
        }
        
        return project;
    }
}
