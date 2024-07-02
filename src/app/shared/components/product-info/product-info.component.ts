import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { AddToCartButtonComponent } from '../add-to-cart-button/add-to-cart-button.component';
import { Product } from '../../models/product/product.model';
import { RatingComponent } from '../rating/rating.component';
import { NgIf, NgStyle } from '@angular/common';
import { ProductReviewsComponent } from '../product-reviews/product-reviews.component';

@Component({
  selector: 'app-product-info',
  standalone: true,
  imports: [
    AddToCartButtonComponent,
    RatingComponent,
    NgIf,
    NgStyle,
    ProductReviewsComponent,
  ],
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css'],
})
export class ProductInfoComponent implements OnInit, OnChanges {
  private readonly AVAILABILITY_IN_STOCK = {
    value: 'In stock',
    styleClass: 'availability--in-stock',
  };
  private readonly AVAILABILITY_OUT_OF_STOCK = {
    value: 'Out of stock',
    styleClass: 'availability--out-of-stock',
  };
  private readonly AVAILABILITY_ALMOST_SOLD_OUT = {
    value: 'Almost sold out',
    styleClass: 'availability--almost-sold-out',
  };

  @Input() product!: Product;

  availability!: { value: string; styleClass: string };

  ngOnInit(): void {
    this.updateAvailability();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product']?.currentValue) {
      this.updateAvailability();
    }
  }

  private updateAvailability(): void {
    if (this.product) {
      this.availability =
        this.product.stock > 10
          ? this.AVAILABILITY_IN_STOCK
          : this.product.stock < 1
            ? this.AVAILABILITY_OUT_OF_STOCK
            : this.AVAILABILITY_ALMOST_SOLD_OUT;
    }
  }
}
