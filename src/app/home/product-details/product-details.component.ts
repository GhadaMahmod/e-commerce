import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { catchError, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';

@Component({
  standalone: true,
  imports: [CommonModule, CarouselModule],
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  product: any = {};
  id: any;

  constructor(
    private homeService: HomeService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res: any) => {
      this.id = res?.id;
      this.getProductById();
    })
  }

  getProductById(): void {
    this.homeService?.getProductById(this.id)?.pipe(
      tap(res => this.handleSuccessProducts(res)),
      catchError(err => this.handleError(err))
    ).subscribe();
  }
  handleSuccessProducts(res: any): void {
    this.product = res?.data;
  }
  handleError(res: any): any { }
}
