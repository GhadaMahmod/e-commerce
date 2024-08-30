import { DialogService } from 'primeng/dynamicdialog';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs';
import { HomeService } from '../../services/home.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
  providers: [DialogService]
})
export class ProductItemComponent {
  @Input() item: any = {};
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private homeService: HomeService
  ) { }



  showDetails(): void {
    this.router.navigate(['/ProductDetails/' + this.item?.id])
  }

  addProduct(id: any, type?: any, event?: any): void {
    event.stopPropagation();
    type == 'cart' ? this.isLoading = true : '';
    this.homeService?.addProduct(id, type)?.pipe(
      tap(res => this.handleSuccessProducts(res)),
      catchError(err => this.handleError(err))
    ).subscribe();
  }
  handleSuccessProducts(res: any): void {
    // this.categories = res?.data;
    this.isLoading = false;
  }
  handleError(err: any): any {
    this.isLoading = false;
  }
}
