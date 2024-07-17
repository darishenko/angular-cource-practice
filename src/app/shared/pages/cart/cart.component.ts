import { Component, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { CartService } from '../../services/cart/cart.service';
import { CartItem } from '../../models/cart-item/cart-item.model';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { animate, style, transition, trigger } from '@angular/animations';

const hiddenVisible = trigger('hiddenVisible', [
  transition('void => *', [
    style({ transform: 'translateX(-100%)', opacity: 0 }),
    animate(
      '1.5s ease-in-out',
      style({ transform: 'translateX(0)', opacity: 1 }),
    ),
  ]),
  transition('* => void', [
    animate(
      '1.5s ease-in',
      style({ transform: 'translateX(100%)', opacity: 0 }),
    ),
  ]),
]);

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [NgForOf, FaIconComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  animations: [hiddenVisible],
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
