import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-to-cart-button',
  standalone: true,
  imports: [NgIf],
  templateUrl: './add-to-cart-button.component.html',
  styleUrl: 'add-to-cart-button.component.css',
})
export class AddToCartButtonComponent {
  @Input() itemId!: number;
  @Input() disabled!: boolean;
  @Input() maxCount!: number;
  @Input() cartCount: number = 0;

  @Output() wasCountChanged = new EventEmitter<{ id: number; count: number }>();

  incrementCartCount() {
    this.cartCount++;
    this.wasCountChanged.emit({ id: this.itemId, count: this.cartCount });
  }

  decrementCartCount() {
    this.cartCount--;
    this.wasCountChanged.emit({ id: this.itemId, count: this.cartCount });
  }
}
