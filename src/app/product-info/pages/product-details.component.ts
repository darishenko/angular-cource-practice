import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product/product.model';
import { ProductService } from '../../shared/services/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { ProductInfoComponent } from '../components/product-info/product-info.component';
import { ProductReviewsComponent } from '../components/product-reviews/product-reviews.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [ProductInfoComponent, ProductReviewsComponent, NgIf],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  id!: number;
  product!: Product;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.id = +params.get('id')!;
      if (!isNaN(this.id)) {
        this.productService.get(this.id).subscribe((product) => {
          this.product = product;
        });
      } else {
        console.error('Invalid product ID');
      }
    });
  }
}
