import { Component, Input } from '@angular/core';
import { AddToCartButtonComponent } from '../add-to-cart-button/add-to-cart-button.component';
import { Product } from '../../models/product/product.model';
import { RatingComponent } from '../rating/rating.component';
import { NgIf, NgStyle } from '@angular/common';
import { ProductReviewsComponent } from '../product-reviews/product-reviews.component';
import { ProductAvailabilityDirective } from '../../directives/product-availability/product-availability.directive';

@Component({
  selector: 'app-product-info',
  standalone: true,
  imports: [
    AddToCartButtonComponent,
    RatingComponent,
    NgIf,
    NgStyle,
    ProductReviewsComponent,
    ProductAvailabilityDirective,
  ],
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css'],
})
export class ProductInfoComponent {
  @Input() product!: Product;
}
