import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SignupRequest } from '../../models/user.model';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupData: SignupRequest = {
    username: '',
    email: '',
    password: '',
    fullName: '',
    phone: ''
  };
  
  confirmPassword = '';
  loading = false;
  error = '';
  success = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onSubmit(): void {
    if (this.signupData.password !== this.confirmPassword) {
      this.error = 'Passwords do not match';
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.signup(this.signupData).subscribe({
      next: () => {
        this.success = true;
        this.loading = false;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        console.error('Signup error:', err);
        this.error = err.error?.message || 'Signup failed. Please try again.';
        this.loading = false;
      }
    });
  }
}
