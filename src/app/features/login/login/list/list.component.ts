import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ItemsStore } from './store/items.store';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, MatListModule, MatProgressSpinnerModule],
  providers: [ItemsStore], // Provide the Signal Store locally
  template: `
    <h2>Items List</h2>

    <div *ngIf="store.isLoading()" class="center-msg">
      <mat-spinner diameter="50"></mat-spinner>
      <p>Loading data...</p>
    </div>

    <div *ngIf="store.error()" class="error-msg">
      {{ store.error() }}
    </div>

    <mat-list *ngIf="!store.isLoading() && !store.error()">
      <mat-list-item *ngFor="let item of store.items()">
        <span matListItemTitle>{{ item.name }}</span>
        <span matListItemLine>{{ item.description }}</span>
      </mat-list-item>
    </mat-list>
  `,
  styles: [`
    .center-msg { display: flex; flex-direction: column; align-items: center; margin-top: 50px; }
    .error-msg { color: red; font-weight: bold; }
  `]
})
export class ListComponent implements OnInit {
  readonly store = inject(ItemsStore);

  ngOnInit() {
    this.store.loadItems();
  }
}