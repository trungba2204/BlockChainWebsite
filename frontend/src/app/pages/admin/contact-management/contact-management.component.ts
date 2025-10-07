import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../../services/contact.service';
import { Contact } from '../../../models/contact.model';

@Component({
  selector: 'app-contact-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-management.component.html',
  styleUrls: ['../blog-management/blog-management.component.css']
})
export class ContactManagementComponent implements OnInit {
  contacts: Contact[] = [];
  selectedContact?: Contact;
  loading = false;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.loading = true;
    this.contactService.getAllContacts().subscribe({
      next: (data) => {
        this.contacts = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  updateStatus(id: number, status: string): void {
    this.contactService.updateContactStatus(id, status).subscribe({
      next: () => this.loadContacts(),
      error: (err) => console.error(err)
    });
  }

  deleteContact(id: number): void {
    if (confirm('Are you sure you want to delete this contact?')) {
      this.contactService.deleteContact(id).subscribe({
        next: () => this.loadContacts(),
        error: (err) => console.error(err)
      });
    }
  }

  viewDetails(contact: Contact): void {
    this.selectedContact = contact;
  }

  closeDetails(): void {
    this.selectedContact = undefined;
  }
}
