import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contact: Contact = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  
  submitted = false;
  loading = false;
  error = '';

  constructor(private contactService: ContactService) { }

  onSubmit(): void {
    if (this.isValidForm()) {
      this.loading = true;
      this.error = '';
      
      this.contactService.createContact(this.contact).subscribe({
        next: () => {
          this.submitted = true;
          this.loading = false;
          this.resetForm();
        },
        error: (err) => {
          console.error('Error submitting contact:', err);
          this.error = 'Failed to send message. Please try again.';
          this.loading = false;
        }
      });
    }
  }

  isValidForm(): boolean {
    return !!(this.contact.name && this.contact.email && this.contact.message);
  }

  resetForm(): void {
    this.contact = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  }
}
