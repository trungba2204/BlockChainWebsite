package com.blockchain.controller;

import com.blockchain.dto.CareerDTO;
import com.blockchain.service.CareerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/careers")
public class CareerController {
    
    @Autowired
    private CareerService careerService;
    
    @GetMapping("/active")
    public ResponseEntity<List<CareerDTO>> getActiveCareers() {
        return ResponseEntity.ok(careerService.getActiveCareers());
    }
    
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<CareerDTO>> getAllCareers() {
        return ResponseEntity.ok(careerService.getAllCareers());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<CareerDTO> getCareerById(@PathVariable Long id) {
        return ResponseEntity.ok(careerService.getCareerById(id));
    }
    
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CareerDTO> createCareer(@RequestBody CareerDTO dto) {
        return ResponseEntity.ok(careerService.createCareer(dto));
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CareerDTO> updateCareer(@PathVariable Long id, @RequestBody CareerDTO dto) {
        return ResponseEntity.ok(careerService.updateCareer(id, dto));
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteCareer(@PathVariable Long id) {
        careerService.deleteCareer(id);
        return ResponseEntity.ok().build();
    }
}
