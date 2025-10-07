import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CareerService } from '../../services/career.service';
import { Career } from '../../models/career.model';

@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.css']
})
export class CareersComponent implements OnInit {
  careers: Career[] = [];
  loading = false;

  constructor(private careerService: CareerService) { }

  ngOnInit(): void {
    this.loadCareers();
  }

  loadCareers(): void {
    this.loading = true;
    this.careerService.getActiveCareers().subscribe({
      next: (data) => {
        this.careers = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading careers:', err);
        this.loading = false;
      }
    });
  }
}
