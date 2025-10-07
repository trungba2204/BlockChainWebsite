package com.blockchain.service;

import com.blockchain.dto.TeamMemberDTO;
import com.blockchain.entity.TeamMember;
import com.blockchain.repository.TeamMemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class TeamMemberService {
    
    @Autowired
    private TeamMemberRepository teamMemberRepository;
    
    public List<TeamMemberDTO> getAllTeamMembers() {
        return teamMemberRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public List<TeamMemberDTO> getActiveTeamMembers() {
        return teamMemberRepository.findByActiveTrueOrderByDisplayOrderAsc().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public TeamMemberDTO getTeamMemberById(Long id) {
        TeamMember member = teamMemberRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Team member not found with id: " + id));
        return convertToDTO(member);
    }
    
    public TeamMemberDTO createTeamMember(TeamMemberDTO dto) {
        TeamMember member = convertToEntity(dto);
        TeamMember savedMember = teamMemberRepository.save(member);
        return convertToDTO(savedMember);
    }
    
    public TeamMemberDTO updateTeamMember(Long id, TeamMemberDTO dto) {
        TeamMember member = teamMemberRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Team member not found with id: " + id));
        
        member.setFullName(dto.getFullName());
        member.setPosition(dto.getPosition());
        member.setBio(dto.getBio());
        member.setImageUrl(dto.getImageUrl());
        member.setEmail(dto.getEmail());
        member.setLinkedin(dto.getLinkedin());
        member.setTwitter(dto.getTwitter());
        member.setDisplayOrder(dto.getDisplayOrder());
        member.setActive(dto.getActive());
        
        TeamMember updatedMember = teamMemberRepository.save(member);
        return convertToDTO(updatedMember);
    }
    
    public void deleteTeamMember(Long id) {
        teamMemberRepository.deleteById(id);
    }
    
    private TeamMemberDTO convertToDTO(TeamMember member) {
        TeamMemberDTO dto = new TeamMemberDTO();
        dto.setId(member.getId());
        dto.setFullName(member.getFullName());
        dto.setPosition(member.getPosition());
        dto.setBio(member.getBio());
        dto.setImageUrl(member.getImageUrl());
        dto.setEmail(member.getEmail());
        dto.setLinkedin(member.getLinkedin());
        dto.setTwitter(member.getTwitter());
        dto.setDisplayOrder(member.getDisplayOrder());
        dto.setActive(member.getActive());
        dto.setCreatedAt(member.getCreatedAt());
        dto.setUpdatedAt(member.getUpdatedAt());
        return dto;
    }
    
    private TeamMember convertToEntity(TeamMemberDTO dto) {
        TeamMember member = new TeamMember();
        member.setFullName(dto.getFullName());
        member.setPosition(dto.getPosition());
        member.setBio(dto.getBio());
        member.setImageUrl(dto.getImageUrl());
        member.setEmail(dto.getEmail());
        member.setLinkedin(dto.getLinkedin());
        member.setTwitter(dto.getTwitter());
        member.setDisplayOrder(dto.getDisplayOrder() != null ? dto.getDisplayOrder() : 0);
        member.setActive(dto.getActive() != null ? dto.getActive() : true);
        return member;
    }
}
