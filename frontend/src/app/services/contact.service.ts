import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact.model';

const API_URL = 'http://localhost:8080/api/contacts';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  createContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(API_URL, contact);
  }

  getAllContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(API_URL);
  }

  getContactById(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${API_URL}/${id}`);
  }

  updateContactStatus(id: number, status: string): Observable<Contact> {
    return this.http.put<Contact>(`${API_URL}/${id}/status?status=${status}`, {});
  }

  deleteContact(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/${id}`);
  }
}
