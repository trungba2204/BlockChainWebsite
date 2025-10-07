package com.blockchain.controller;

import com.blockchain.dto.TeamMemberDTO;
import com.blockchain.service.TeamMemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/team-members")
public class TeamMemberController {
    
    @Autowired
    private TeamMemberService teamMemberService;
    
    @GetMapping("/active")
    public ResponseEntity<List<TeamMemberDTO>> getActiveTeamMembers() {
        return ResponseEntity.ok(teamMemberService.getActiveTeamMembers());
    }
    
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<TeamMemberDTO>> getAllTeamMembers() {
        return ResponseEntity.ok(teamMemberService.getAllTeamMembers());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<TeamMemberDTO> getTeamMemberById(@PathVariable Long id) {
        return ResponseEntity.ok(teamMemberService.getTeamMemberById(id));
    }
    
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<TeamMemberDTO> createTeamMember(@RequestBody TeamMemberDTO dto) {
        return ResponseEntity.ok(teamMemberService.createTeamMember(dto));
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<TeamMemberDTO> updateTeamMember(@PathVariable Long id, @RequestBody TeamMemberDTO dto) {
        return ResponseEntity.ok(teamMemberService.updateTeamMember(id, dto));
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteTeamMember(@PathVariable Long id) {
        teamMemberService.deleteTeamMember(id);
        return ResponseEntity.ok().build();
    }
}
