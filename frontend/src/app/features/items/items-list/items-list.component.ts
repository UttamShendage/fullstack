import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ItemService } from '../../../services/item.service';
import { Item } from '../../../models/item.model';

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './items-list.component.html',
  styleUrl: './items-list.component.scss'
})
export class ItemsListComponent implements OnInit {
  items = signal<Item[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.loading.set(true);
    this.error.set(null);
    this.itemService.getAll().subscribe({
      next: (data) => {
        this.items.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err?.message || 'Failed to load items. Is the backend running?');
        this.loading.set(false);
      }
    });
  }

  deleteItem(id: number): void {
    if (!confirm('Are you sure you want to delete this item?')) return;

    this.itemService.delete(id).subscribe({
      next: () => this.loadItems(),
      error: (err) => this.error.set(err?.message || 'Failed to delete item')
    });
  }
}
