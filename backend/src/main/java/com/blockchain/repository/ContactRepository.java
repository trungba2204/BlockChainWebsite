package com.blockchain.repository;

import com.blockchain.entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {
    List<Contact> findByOrderByCreatedAtDesc();
    List<Contact> findByStatusOrderByCreatedAtDesc(Contact.Status status);
}
