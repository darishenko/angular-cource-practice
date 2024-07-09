import { Component, OnInit } from '@angular/core';
import { ProductInfoEditComponent } from '../../components/product-info-edit/product-info-edit.component';
import { Product } from '../../models/product/product.model';
import { ProductService } from '../../services/product/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [ProductInfoEditComponent],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css',
})
export class ProductEditComponent implements OnInit {
  id: number = this.route.snapshot.queryParams['id'];
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
          console.log(product);
          this.product = product;
        });
      } else {
        console.error('Invalid product ID');
      }
    });
  }
}
