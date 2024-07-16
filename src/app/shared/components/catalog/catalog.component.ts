import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../models/product/product.model';
import { NgFor, NgIf, NgOptimizedImage, NgStyle } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { AddToCartButtonComponent } from '../add-to-cart-button/add-to-cart-button.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { RatingComponent } from '../rating/rating.component';
import { CartItem } from '../../models/cart-item/cart-item.model';
import { CartService } from '../../services/cart/cart.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
  standalone: true,
  imports: [
    NgFor,
    NgOptimizedImage,
    NgStyle,
    HeaderComponent,
    FaIconComponent,
    AddToCartButtonComponent,
    RouterLink,
    RouterLinkActive,
    RatingComponent,
    NgIf,
  ],
})
export class CatalogComponent implements OnInit {
  @Input() products!: Product[];

  @Output() wasDeleted = new EventEmitter<number>();

  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe((cart: CartItem[]) => {
      this.cartItems = cart;
    });
  }

  deleteProduct(id: number) {
    this.wasDeleted.emit(id);
  }

  handleCartCountChange($event: { id: number; count: number }) {
    const product = this.products.find((product) => product.id === $event.id);
    const cartItem = new CartItem(
      product!.id,
      product!.title,
      $event.count,
      product!.price,
    );
    this.cartService.updateItem(cartItem).subscribe();
  }

  getCartCount(productId: number): number {
    const item = this.cartItems.find((cartItem) => cartItem.id === productId);
    return item ? item.count : 0;
  }

  protected readonly CartItem = CartItem;
  protected readonly map = map;
}
