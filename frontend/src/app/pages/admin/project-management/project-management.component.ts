import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/project.model';

@Component({
  selector: 'app-project-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './project-management.component.html',
  styleUrls: ['../blog-management/blog-management.component.css']
})
export class ProjectManagementComponent implements OnInit {
  projects: Project[] = [];
  selectedProject?: Project;
  isEditing = false;
  loading = false;

  newProject: Project = {
    title: '',
    description: '',
    detailContent: '',
    imageUrl: '',
    featured: false
  };

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.loading = true;
    this.projectService.getAllProjects().subscribe({
      next: (data) => {
        this.projects = data;
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
    this.selectedProject = undefined;
    this.newProject = {
      title: '',
      description: '',
      detailContent: '',
      imageUrl: '',
      featured: false
    };
  }

  editProject(project: Project): void {
    this.isEditing = true;
    this.selectedProject = project;
    this.newProject = { ...project };
  }

  saveProject(): void {
    this.loading = true;

    if (this.selectedProject?.id) {
      this.projectService.updateProject(this.selectedProject.id, this.newProject).subscribe({
        next: () => {
          this.loadProjects();
          this.cancelEdit();
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        }
      });
    } else {
      this.projectService.createProject(this.newProject).subscribe({
        next: () => {
          this.loadProjects();
          this.cancelEdit();
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        }
      });
    }
  }

  deleteProject(id: number): void {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectService.deleteProject(id).subscribe({
        next: () => this.loadProjects(),
        error: (err) => console.error(err)
      });
    }
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.selectedProject = undefined;
    this.loading = false;
  }
}
