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
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { ProductService } from '../../services/product/product.service';
import { FilterQueryService } from '../../services/filter-query/filter.query.service';
import { Product } from '../../models/product/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { BadgeComponent } from '../../components/badge/badge.component';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

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
    NgForOf,
    BadgeComponent,
    FaIconComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  products!: Product[];
  badges: { key: string; value: string }[] = [];
  badgesMap: { [key: string]: { content: string; hasValue: boolean } } = {
    priceFrom: { content: 'Price from ', hasValue: true },
    priceTo: { content: 'Price to ', hasValue: true },
    ratingFrom: { content: 'Rating from ', hasValue: true },
    ratingTo: { content: 'Rating to ', hasValue: true },
    inStock: { content: 'In stock', hasValue: false },
    hasReviews: { content: 'Has reviews', hasValue: false },
  };
  productFilterForm = new FormGroup({
    priceFrom: new FormControl(null, [Validators.min(0)]),
    priceTo: new FormControl(null, [Validators.min(0)]),
    ratingFrom: new FormControl(null, [Validators.min(0)]),
    ratingTo: new FormControl(null, [Validators.min(0)]),
    inStock: new FormControl(null),
    hasReviews: new FormControl(null),
  });

  constructor(
    private productService: ProductService,
    private filterQueryService: FilterQueryService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.pipe(take(1)).subscribe((params) => {
      this.productFilterForm.patchValue(params);
    });
    this.route.queryParams.subscribe((params) => {
      this.findProducts();
      this.updateBadges();
    });
  }

  updateAfterFilterBadgeDelete(key: string) {
    this.productFilterForm.get(key)?.reset();
    this.filter();
  }

  deleteProduct($event: number) {
    this.productService.delete($event).subscribe(() => {
      this.getProducts();
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

  private updateBadges() {
    this.badges = [];
    Object.entries(this.productFilterForm.value).forEach(([filter, value]) => {
      if (value != null && value !== false) {
        const badge = this.badgesMap[filter];
        this.badges.push({
          key: filter,
          value: badge.content.concat(badge.hasValue ? value : ''),
        });
      }
    });
  }

  private updateUrl(queryParams: { [key: string]: any }, replaceUrl = true) {
    this.router.navigate([], {
      queryParams: queryParams,
      replaceUrl: replaceUrl,
    });
  }

  protected readonly faTimes = faTimes;
}
