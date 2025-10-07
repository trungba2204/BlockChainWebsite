package com.blockchain.controller;

import com.blockchain.dto.ContactDTO;
import com.blockchain.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/contacts")
public class ContactController {
    
    @Autowired
    private ContactService contactService;
    
    @PostMapping
    public ResponseEntity<ContactDTO> createContact(@RequestBody ContactDTO dto) {
        return ResponseEntity.ok(contactService.createContact(dto));
    }
    
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ContactDTO>> getAllContacts() {
        return ResponseEntity.ok(contactService.getAllContacts());
    }
    
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ContactDTO> getContactById(@PathVariable Long id) {
        return ResponseEntity.ok(contactService.getContactById(id));
    }
    
    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ContactDTO> updateContactStatus(@PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(contactService.updateContactStatus(id, status));
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteContact(@PathVariable Long id) {
        contactService.deleteContact(id);
        return ResponseEntity.ok().build();
    }
}
