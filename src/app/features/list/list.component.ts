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
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  readonly store = inject(ItemsStore);

  ngOnInit() {
    this.store.loadItems();
  }
}