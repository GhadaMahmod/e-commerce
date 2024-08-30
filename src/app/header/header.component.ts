import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  feature: string = 'recipes';
  @Output() featureSelected = new EventEmitter();

  onSelectFeature(type: string): void {
    this.featureSelected.emit(type);
    this.feature = type;
  }
}
