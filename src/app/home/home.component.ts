import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeService } from '../services/home.service';
import { catchError, Subscription, tap } from 'rxjs';
import { CategoryCardComponent } from './category-card/category-card.component';
import { CarouselModule } from 'primeng/carousel';
import { ProductItemComponent } from './product-item/product-item.component';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, CategoryCardComponent, CarouselModule, ProductItemComponent],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  categories: any = [];
  products: any = [];
  responsiveOptions: any = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ]
  constructor(
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getProducts();
  }
  getCategories(): void {
    this.homeService?.getCategories()?.pipe(
      tap(res => this.handleSuccessCategories(res)),
      catchError(err => this.handleError(err))
    ).subscribe();
  }
  getProducts(): void {
    this.homeService?.getProducts()?.pipe(
      tap(res => this.handleSuccessProducts(res)),
      catchError(err => this.handleError(err))
    ).subscribe();
  }
  handleSuccessCategories(res: any): void {
    this.categories = res?.data;
  }
  handleSuccessProducts(res: any): void {
    this.products = res?.data;
  }
  handleError(res: any): any { }
}
