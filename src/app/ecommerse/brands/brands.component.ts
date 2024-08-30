import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { catchError, tap } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {
  brands: any = [];
  constructor(
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(): void {
    this.homeService?.getBrands()?.pipe(
      tap(res => this.handleSuccessBrands(res)),
      catchError(err => this.handleError(err))
    ).subscribe();
  }
  handleSuccessBrands(res: any): void {
    this.brands = res?.data;
  }
  handleError(res: any): any { }
}
