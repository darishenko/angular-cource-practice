import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { Product } from '../../models/product/product.model';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-product-info-edit',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, FormsModule, NgClass],
  templateUrl: './product-info-edit.component.html',
  styleUrl: './product-info-edit.component.css',
})
export class ProductInfoEditComponent implements OnChanges {
  @Input() product!: Product;

  productEditForm!: FormGroup;
  isUpdateSuccessful: boolean = false;

  constructor(private productService: ProductService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.product && changes['product']) {
      this.productEditForm = new FormGroup({
        image: new FormControl(
          this.product.image || 'https://',
          Validators.pattern('^$|^(https?:\\/\\/).*'),
        ),
        title: new FormControl(this.product.title, Validators.required),
        price: new FormControl(this.product.price, [
          Validators.required,
          Validators.pattern('^[0-9]+(\\.[0-9]*)?$'),
          this.priceValidator,
          Validators.min(0.01),
        ]),
        stock: new FormControl(this.product.stock, [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
        ]),
        description: new FormControl(this.product.description),
      });
    }
  }

  updateProductInfo() {
    if (this.productEditForm.valid) {
      const updatedProduct: Product = this.productEditForm.value;
      updatedProduct.id = this.product.id;
      this.productService.updatePartial(updatedProduct).subscribe(
        () => {
          this.isUpdateSuccessful = true;
          setTimeout(() => (this.isUpdateSuccessful = false), 2000);
        },
        (error) => {
          console.error('Error updating product', error);
        },
      );
    }
  }

  priceValidator(control: FormControl): { [p: string]: any } | null {
    const value = control.value;
    if (value) {
      const decimalPart = value.toString().split('.')[1];
      if (decimalPart && decimalPart.length > 2) {
        return { decimalPlaces: { value: value } };
      }
    }
    return null;
  }
}
