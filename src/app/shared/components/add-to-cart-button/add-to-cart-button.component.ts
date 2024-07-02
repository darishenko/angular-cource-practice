import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-to-cart-button',
  standalone: true,
  imports: [NgIf],
  templateUrl: './add-to-cart-button.component.html',
  styleUrl: 'add-to-cart-button.component.css',
})
export class AddToCartButtonComponent {
  cartCount: number = 0;

  incrementCartCount() {
    this.cartCount++;
  }

  decrementCartCount() {
    this.cartCount--;
  }
}
