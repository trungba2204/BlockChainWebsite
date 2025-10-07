import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogService } from '../../../services/blog.service';
import { ProjectService } from '../../../services/project.service';
import { TeamMemberService } from '../../../services/team-member.service';
import { CareerService } from '../../../services/career.service';
import { ContactService } from '../../../services/contact.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stats = {
    blogs: 0,
    projects: 0,
    teamMembers: 0,
    careers: 0,
    contacts: 0
  };

  loading = false;

  constructor(
    private blogService: BlogService,
    private projectService: ProjectService,
    private teamMemberService: TeamMemberService,
    private careerService: CareerService,
    private contactService: ContactService
  ) { }

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.loading = true;

    this.blogService.getAllBlogs().subscribe({
      next: (data) => this.stats.blogs = data.length,
      error: (err) => console.error(err)
    });

    this.projectService.getAllProjects().subscribe({
      next: (data) => this.stats.projects = data.length,
      error: (err) => console.error(err)
    });

    this.teamMemberService.getAllTeamMembers().subscribe({
      next: (data) => this.stats.teamMembers = data.length,
      error: (err) => console.error(err)
    });

    this.careerService.getAllCareers().subscribe({
      next: (data) => this.stats.careers = data.length,
      error: (err) => console.error(err)
    });

    this.contactService.getAllContacts().subscribe({
      next: (data) => {
        this.stats.contacts = data.length;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }
}
