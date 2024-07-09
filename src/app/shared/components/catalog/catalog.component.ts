import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product/product.model';
import { ProductService } from '../../services/product/product.service';
import { NgFor, NgIf, NgOptimizedImage, NgStyle } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { AddToCartButtonComponent } from '../add-to-cart-button/add-to-cart-button.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { RatingComponent } from '../rating/rating.component';

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
export class CatalogComponent {
  @Input() products!: Product[];

  @Output() wasDeleted = new EventEmitter<number>();

  constructor(private productService: ProductService) {}

  deleteProduct(id: number) {
    this.productService.delete(id).subscribe((data) => {
      this.wasDeleted.emit(id);
      console.log(data);
    });
  }
}
