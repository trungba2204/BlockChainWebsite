package com.blockchain.service;

import com.blockchain.dto.CareerDTO;
import com.blockchain.entity.Career;
import com.blockchain.repository.CareerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class CareerService {
    
    @Autowired
    private CareerRepository careerRepository;
    
    public List<CareerDTO> getAllCareers() {
        return careerRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public List<CareerDTO> getActiveCareers() {
        return careerRepository.findByActiveTrueOrderByCreatedAtDesc().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public CareerDTO getCareerById(Long id) {
        Career career = careerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Career not found with id: " + id));
        return convertToDTO(career);
    }
    
    public CareerDTO createCareer(CareerDTO dto) {
        Career career = convertToEntity(dto);
        Career savedCareer = careerRepository.save(career);
        return convertToDTO(savedCareer);
    }
    
    public CareerDTO updateCareer(Long id, CareerDTO dto) {
        Career career = careerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Career not found with id: " + id));
        
        career.setTitle(dto.getTitle());
        career.setDescription(dto.getDescription());
        career.setRequirements(dto.getRequirements());
        career.setResponsibilities(dto.getResponsibilities());
        career.setJobType(Career.JobType.valueOf(dto.getJobType()));
        career.setWorkLocation(Career.WorkLocation.valueOf(dto.getWorkLocation()));
        career.setLocation(dto.getLocation());
        career.setSalaryRange(dto.getSalaryRange());
        career.setActive(dto.getActive());
        
        Career updatedCareer = careerRepository.save(career);
        return convertToDTO(updatedCareer);
    }
    
    public void deleteCareer(Long id) {
        careerRepository.deleteById(id);
    }
    
    private CareerDTO convertToDTO(Career career) {
        CareerDTO dto = new CareerDTO();
        dto.setId(career.getId());
        dto.setTitle(career.getTitle());
        dto.setDescription(career.getDescription());
        dto.setRequirements(career.getRequirements());
        dto.setResponsibilities(career.getResponsibilities());
        dto.setJobType(career.getJobType().name());
        dto.setWorkLocation(career.getWorkLocation().name());
        dto.setLocation(career.getLocation());
        dto.setSalaryRange(career.getSalaryRange());
        dto.setActive(career.getActive());
        dto.setCreatedAt(career.getCreatedAt());
        dto.setUpdatedAt(career.getUpdatedAt());
        return dto;
    }
    
    private Career convertToEntity(CareerDTO dto) {
        Career career = new Career();
        career.setTitle(dto.getTitle());
        career.setDescription(dto.getDescription());
        career.setRequirements(dto.getRequirements());
        career.setResponsibilities(dto.getResponsibilities());
        career.setJobType(Career.JobType.valueOf(dto.getJobType()));
        career.setWorkLocation(Career.WorkLocation.valueOf(dto.getWorkLocation()));
        career.setLocation(dto.getLocation());
        career.setSalaryRange(dto.getSalaryRange());
        career.setActive(dto.getActive() != null ? dto.getActive() : true);
        return career;
    }
}
