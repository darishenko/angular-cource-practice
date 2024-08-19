import { Component, Input, OnInit } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { NgForOf, NgIf } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons/faUserCircle';
import { RatingComponent } from '../../../shared/components/rating/rating.component';
import { Review } from '../../models/review.model';

@Component({
  selector: 'app-product-reviews',
  standalone: true,
  imports: [NgIf, NgForOf, FaIconComponent, RatingComponent],
  templateUrl: './product-reviews.component.html',
  styleUrl: './product-reviews.component.css',
})
export class ProductReviewsComponent implements OnInit {
  @Input() productId!: number;

  reviews!: Review[];
  protected readonly faUserCircle = faUserCircle;

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.reviewService
      .getByProductId(this.productId)
      .subscribe((reviews: Review[]) => {
        this.reviews = reviews;
      });
  }
}
