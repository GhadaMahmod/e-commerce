import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommerseComponent } from './ecommerse.component';

describe('EcommerseComponent', () => {
  let component: EcommerseComponent;
  let fixture: ComponentFixture<EcommerseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EcommerseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EcommerseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
