package com.blockchain.service;

import com.blockchain.dto.ContactDTO;
import com.blockchain.entity.Contact;
import com.blockchain.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ContactService {
    
    @Autowired
    private ContactRepository contactRepository;
    
    public List<ContactDTO> getAllContacts() {
        return contactRepository.findByOrderByCreatedAtDesc().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public ContactDTO getContactById(Long id) {
        Contact contact = contactRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contact not found with id: " + id));
        return convertToDTO(contact);
    }
    
    public ContactDTO createContact(ContactDTO dto) {
        Contact contact = convertToEntity(dto);
        Contact savedContact = contactRepository.save(contact);
        return convertToDTO(savedContact);
    }
    
    public ContactDTO updateContactStatus(Long id, String status) {
        Contact contact = contactRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contact not found with id: " + id));
        
        contact.setStatus(Contact.Status.valueOf(status));
        Contact updatedContact = contactRepository.save(contact);
        return convertToDTO(updatedContact);
    }
    
    public void deleteContact(Long id) {
        contactRepository.deleteById(id);
    }
    
    private ContactDTO convertToDTO(Contact contact) {
        ContactDTO dto = new ContactDTO();
        dto.setId(contact.getId());
        dto.setName(contact.getName());
        dto.setEmail(contact.getEmail());
        dto.setSubject(contact.getSubject());
        dto.setMessage(contact.getMessage());
        dto.setStatus(contact.getStatus().name());
        dto.setCreatedAt(contact.getCreatedAt());
        return dto;
    }
    
    private Contact convertToEntity(ContactDTO dto) {
        Contact contact = new Contact();
        contact.setName(dto.getName());
        contact.setEmail(dto.getEmail());
        contact.setSubject(dto.getSubject());
        contact.setMessage(dto.getMessage());
        return contact;
    }
}
