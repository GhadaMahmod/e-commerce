import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private readonly baseUrl = environment?.apiUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  getCategories(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/categories`);
  }
  getProducts(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/products`);
  }
  getProductById(id: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/products/${id}`);
  }
  addProduct(id: any, type: any): Observable<any> {
    let data = {
      productId: id
    }
    return this.http.post<any>(`${this.baseUrl}/${type}`, data);
  }

  getBrands(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/brands`);
  }
}
