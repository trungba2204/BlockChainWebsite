import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TeamMemberService } from '../../../services/team-member.service';
import { TeamMember } from '../../../models/team-member.model';

@Component({
  selector: 'app-team-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './team-management.component.html',
  styleUrls: ['../blog-management/blog-management.component.css']
})
export class TeamManagementComponent implements OnInit {
  teamMembers: TeamMember[] = [];
  selectedMember?: TeamMember;
  isEditing = false;
  loading = false;

  newMember: TeamMember = {
    fullName: '',
    position: '',
    bio: '',
    imageUrl: '',
    email: '',
    displayOrder: 0,
    active: true
  };

  constructor(private teamMemberService: TeamMemberService) { }

  ngOnInit(): void {
    this.loadTeamMembers();
  }

  loadTeamMembers(): void {
    this.loading = true;
    this.teamMemberService.getAllTeamMembers().subscribe({
      next: (data) => {
        this.teamMembers = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  openCreateForm(): void {
    this.isEditing = true;
    this.selectedMember = undefined;
    this.newMember = {
      fullName: '',
      position: '',
      bio: '',
      imageUrl: '',
      email: '',
      displayOrder: 0,
      active: true
    };
  }

  editMember(member: TeamMember): void {
    this.isEditing = true;
    this.selectedMember = member;
    this.newMember = { ...member };
  }

  saveMember(): void {
    this.loading = true;

    if (this.selectedMember?.id) {
      this.teamMemberService.updateTeamMember(this.selectedMember.id, this.newMember).subscribe({
        next: () => {
          this.loadTeamMembers();
          this.cancelEdit();
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        }
      });
    } else {
      this.teamMemberService.createTeamMember(this.newMember).subscribe({
        next: () => {
          this.loadTeamMembers();
          this.cancelEdit();
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        }
      });
    }
  }

  deleteMember(id: number): void {
    if (confirm('Are you sure you want to delete this team member?')) {
      this.teamMemberService.deleteTeamMember(id).subscribe({
        next: () => this.loadTeamMembers(),
        error: (err) => console.error(err)
      });
    }
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.selectedMember = undefined;
    this.loading = false;
  }
}
