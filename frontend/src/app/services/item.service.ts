import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item, CreateItemRequest, UpdateItemRequest } from '../models/item.model';

const API_URL = 'http://localhost:5047/api/items';

@Injectable({ providedIn: 'root' })
export class ItemService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Item[]> {
    return this.http.get<Item[]>(API_URL);
  }

  getById(id: number): Observable<Item> {
    return this.http.get<Item>(`${API_URL}/${id}`);
  }

  create(item: CreateItemRequest): Observable<Item> {
    return this.http.post<Item>(API_URL, item);
  }

  update(id: number, item: UpdateItemRequest): Observable<Item> {
    return this.http.put<Item>(`${API_URL}/${id}`, item);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`);
  }
}
