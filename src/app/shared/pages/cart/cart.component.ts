import { Component, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { CartService } from '../../services/cart/cart.service';
import { CartItem } from '../../models/cart-item/cart-item.model';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [NgForOf, FaIconComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe({
      next: (cartItems) => {
        console.log(cartItems);
        this.cartItems = cartItems;
      },
      error: (error) => {
        console.error('Error fetching cart items', error);
      },
    });
  }

  deleteItem(id: number) {
    this.cartService.deleteItem(id).subscribe(() => {
      this.cartItems = this.cartItems.filter((item) => id !== item.id);
    });
  }

  protected readonly faTimes = faTimes;
}
