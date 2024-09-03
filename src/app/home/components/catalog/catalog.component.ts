import { Component, Input, OnInit, output } from '@angular/core';
import { Product } from '../../../shared/models/product/product.model';
import { NgFor, NgIf, NgOptimizedImage, NgStyle } from '@angular/common';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { AddToCartButtonComponent } from '../../../shared/components/add-to-cart-button/add-to-cart-button.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { RatingComponent } from '../../../shared/components/rating/rating.component';
import { CartItem } from '../../../cart/models/cart-item.model';
import { CartService } from '../../../cart/services/cart.service';

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

  wasDeleted = output<number>();

  cartItems: CartItem[] = [];
  protected readonly CartItem = CartItem;

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
    this.updateCart(cartItem);
  }

  getCartCount(productId: number): number {
    const item = this.cartItems.find((cartItem) => cartItem.id === productId);
    return item?.count ?? 0;
  }

  private updateCart(cartItem: CartItem) {
    if (cartItem.count === 0) {
      this.cartService.deleteItem(cartItem.id).subscribe();
    } else {
      this.cartService.updateItem(cartItem).subscribe();
    }
  }
}
