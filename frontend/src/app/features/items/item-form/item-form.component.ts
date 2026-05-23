import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { ItemService } from '../../../services/item.service';

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './item-form.component.html',
  styleUrl: './item-form.component.scss'
})
export class ItemFormComponent implements OnInit {
  form!: FormGroup;
  loading = signal(false);
  error = signal<string | null>(null);
  isEditMode = signal(false);
  itemId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private itemService: ItemService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      description: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.itemId = +id;
      this.isEditMode.set(true);
      this.loadItem(this.itemId);
    }
  }

  loadItem(id: number): void {
    this.loading.set(true);
    this.itemService.getById(id).subscribe({
      next: (item) => {
        this.form.patchValue({ name: item.name, description: item.description });
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err?.message || 'Failed to load item');
        this.loading.set(false);
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.loading.set(true);
    this.error.set(null);

    const { name, description } = this.form.value;

    if (this.isEditMode() && this.itemId) {
      this.itemService.update(this.itemId, { name, description }).subscribe({
        next: () => this.router.navigate(['/items']),
        error: (err) => {
          this.error.set(err?.message || 'Failed to update item');
          this.loading.set(false);
        }
      });
    } else {
      this.itemService.create({ name, description }).subscribe({
        next: () => this.router.navigate(['/items']),
        error: (err) => {
          this.error.set(err?.message || 'Failed to create item');
          this.loading.set(false);
        }
      });
    }
  }
}
