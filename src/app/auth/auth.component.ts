// Modules
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [
    // Modules
    RouterModule,
    CommonModule,
  ],
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {


  constructor(
  ) {
  }
}
