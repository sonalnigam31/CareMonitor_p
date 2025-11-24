import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface User {
  email: string;
  token?: string;
}

export interface Item {
  id: number;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class MockApiService {
  // Mock Data "Files"
  private readonly MOCK_USER = { email: 'admin@test.com', password: 'password' };
  private readonly MOCK_ITEMS: Item[] = [
    { id: 1, name: 'Angular', description: 'A web framework.' },
    { id: 2, name: 'React', description: 'A library for UI.' },
    { id: 3, name: 'Vue', description: 'The progressive framework.' },
  ];

  // 1. Login API (POST /api/login)
  
  login(email: string, pass: string): Observable<{ token: string; user: { email: string } }> {
    // Simulate API delay
    return new Observable((observer) => {
      setTimeout(() => {
        if (email === this.MOCK_USER.email && pass === this.MOCK_USER.password) {
          observer.next({
            token: 'mock-jwt-token-xyz-123',
            user: { email: email },
          });
          observer.complete();
        } else {
          observer.error({ message: 'Invalid credentials' });
        }
      }, 1000);
    });
  }

  // 2. List API (GET /api/items)
  getItems(): Observable<Item[]> {
    // Simulate API delay
    return of(this.MOCK_ITEMS).pipe(delay(1500));
  }
}