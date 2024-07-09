import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CatalogComponent } from '../../components/catalog/catalog.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { ProductService } from '../../services/product/product.service';
import { FilterQueryService } from '../../services/filter-query/filter.query.service';
import { Product } from '../../models/product/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    CatalogComponent,
    FormsModule,
    NgIf,
    NgClass,
    ReactiveFormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  products!: Product[];
  productFilterForm = new FormGroup({
    priceFrom: new FormControl(null, [Validators.min(0)]),
    priceTo: new FormControl(null, [Validators.min(0)]),
    ratingFrom: new FormControl(null, [Validators.min(0)]),
    ratingTo: new FormControl(null, [Validators.min(0)]),
    isInStock: new FormControl(null),
    hasReviews: new FormControl(null),
  });

  constructor(
    private productService: ProductService,
    private filterQueryService: FilterQueryService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    console.log('init');
    this.route.queryParams.pipe(take(1)).subscribe((params) => {
      this.productFilterForm.patchValue(params);
      console.log('form');
    });
    this.route.queryParams.subscribe((params) => {
      this.findProducts();
      console.log('params');
    });
  }

  filter() {
    const urlParams = this.filterQueryService.createFilterFormParams(
      this.productFilterForm.value,
    );
    this.updateUrl(urlParams);
  }

  resetFilter() {
    this.productFilterForm.reset();
    this.updateUrl({});
  }

  updateAfterProductDelete() {
    this.getProducts();
  }

  private findProducts() {
    const httpParams = this.filterQueryService.createFilterHttpParams(
      this.productFilterForm.value,
    );
    this.getProducts(httpParams);
  }

  private getProducts(httpParams?: HttpParams) {
    this.productService.getAll(httpParams).subscribe((data) => {
      this.products = data;
      console.log(data);
    });
  }

  private updateUrl(queryParams: { [key: string]: any }, replaceUrl = true) {
    this.router.navigate([], {
      queryParams: queryParams,
      replaceUrl: replaceUrl,
    });
  }
}
