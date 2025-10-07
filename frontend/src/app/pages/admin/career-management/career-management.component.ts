import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CareerService } from '../../../services/career.service';
import { Career } from '../../../models/career.model';

@Component({
  selector: 'app-career-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './career-management.component.html',
  styleUrls: ['../blog-management/blog-management.component.css']
})
export class CareerManagementComponent implements OnInit {
  careers: Career[] = [];
  selectedCareer?: Career;
  isEditing = false;
  loading = false;

  newCareer: Career = {
    title: '',
    description: '',
    requirements: '',
    responsibilities: '',
    jobType: 'FULL_TIME',
    workLocation: 'ON_SITE',
    location: '',
    active: true
  };

  jobTypes = ['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP'];
  workLocations = ['ON_SITE', 'REMOTE', 'HYBRID'];

  constructor(private careerService: CareerService) { }

  ngOnInit(): void {
    this.loadCareers();
  }

  loadCareers(): void {
    this.loading = true;
    this.careerService.getAllCareers().subscribe({
      next: (data) => {
        this.careers = data;
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
    this.selectedCareer = undefined;
    this.newCareer = {
      title: '',
      description: '',
      requirements: '',
      responsibilities: '',
      jobType: 'FULL_TIME',
      workLocation: 'ON_SITE',
      location: '',
      active: true
    };
  }

  editCareer(career: Career): void {
    this.isEditing = true;
    this.selectedCareer = career;
    this.newCareer = { ...career };
  }

  saveCareer(): void {
    this.loading = true;

    if (this.selectedCareer?.id) {
      this.careerService.updateCareer(this.selectedCareer.id, this.newCareer).subscribe({
        next: () => {
          this.loadCareers();
          this.cancelEdit();
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        }
      });
    } else {
      this.careerService.createCareer(this.newCareer).subscribe({
        next: () => {
          this.loadCareers();
          this.cancelEdit();
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        }
      });
    }
  }

  deleteCareer(id: number): void {
    if (confirm('Are you sure you want to delete this career posting?')) {
      this.careerService.deleteCareer(id).subscribe({
        next: () => this.loadCareers(),
        error: (err) => console.error(err)
      });
    }
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.selectedCareer = undefined;
    this.loading = false;
  }
}
