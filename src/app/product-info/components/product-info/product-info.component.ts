import { Component, Input, OnInit } from '@angular/core';
import { AddToCartButtonComponent } from '../../../shared/components/add-to-cart-button/add-to-cart-button.component';
import { Product } from '../../../shared/models/product/product.model';
import { RatingComponent } from '../../../shared/components/rating/rating.component';
import { NgIf, NgStyle } from '@angular/common';
import { ProductReviewsComponent } from '../product-reviews/product-reviews.component';
import { ProductAvailabilityDirective } from '../../directives/product-availability.directive';
import { CartItem } from '../../../cart/models/cart-item.model';
import { CartService } from '../../../cart/services/cart.service';

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
export class ProductInfoComponent implements OnInit {
  @Input() product!: Product;

  cartCount!: number;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getItem(this.product.id).subscribe(
      (item: CartItem) => {
        this.cartCount = item.count ?? 0;
      },
      () => {
        this.cartCount = 0;
      },
    );
  }

  handleCartCountChange($event: { count: number }) {
    const cartItem = new CartItem(
      this.product.id,
      this.product.title,
      $event.count,
      this.product.price,
    );
    this.updateCart(cartItem);
  }

  private updateCart(cartItem: CartItem) {
    if (cartItem.count === 0) {
      this.cartService.deleteItem(cartItem.id).subscribe();
    } else {
      this.cartService.updateItem(cartItem).subscribe();
    }
  }
}
