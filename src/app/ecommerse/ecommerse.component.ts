import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterModule, CommonModule],
  selector: 'app-ecommerse',
  templateUrl: './ecommerse.component.html',
  styleUrl: './ecommerse.component.scss'
})
export class EcommerseComponent {

}
