import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInfoEditComponent } from './product-info-edit.component';

describe('ProductInfoEditComponent', () => {
  let component: ProductInfoEditComponent;
  let fixture: ComponentFixture<ProductInfoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductInfoEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductInfoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
