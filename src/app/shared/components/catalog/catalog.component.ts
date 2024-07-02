import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product/product.model';
import { ProductService } from '../../services/product/product.service';
import { NgFor, NgOptimizedImage, NgStyle } from '@angular/common';
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
  ],
})
export class CatalogComponent implements OnInit {
  products!: Product[];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getAll().subscribe((data) => {
      console.log(data);
      this.products = data;
    });
  }

  deleteProduct(id: number) {
    this.productService.delete(id).subscribe((data) => {
      console.log(data);
      this.ngOnInit();
    });
  }
}
