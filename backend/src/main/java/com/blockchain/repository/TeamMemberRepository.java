package com.blockchain.repository;

import com.blockchain.entity.TeamMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeamMemberRepository extends JpaRepository<TeamMember, Long> {
    List<TeamMember> findByActiveTrueOrderByDisplayOrderAsc();
    List<TeamMember> findByOrderByDisplayOrderAsc();
}
