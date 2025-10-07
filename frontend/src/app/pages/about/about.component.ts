import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { TeamMemberService } from '../../services/team-member.service';
import { TeamMember } from '../../models/team-member.model';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  teamMembers: TeamMember[] = [];
  loading = false;

  photos = [
    { url: 'assets/images/office-1.jpg', alt: 'Office 1' },
    { url: 'assets/images/office-2.jpg', alt: 'Office 2' },
    { url: 'assets/images/office-3.jpg', alt: 'Office 3' }
  ];

  constructor(private teamMemberService: TeamMemberService) { }

  ngOnInit(): void {
    this.loadTeamMembers();
  }

  loadTeamMembers(): void {
    this.loading = true;
    this.teamMemberService.getActiveTeamMembers().subscribe({
      next: (data) => {
        this.teamMembers = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading team members:', err);
        this.loading = false;
      }
    });
  }
}
