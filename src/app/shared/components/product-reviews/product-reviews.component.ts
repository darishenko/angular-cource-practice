import { Component, Input, OnInit } from '@angular/core';
import { Review } from '../../models/review/review.model';
import { ReviewService } from '../../services/review/review.service';
import { NgForOf, NgIf } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons/faUserCircle';
import { RatingComponent } from '../rating/rating.component';

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

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.reviewService
      .getByProductId(this.productId)
      .subscribe((reviews: Review[]) => {
        this.reviews = reviews;
      });
  }

  protected readonly faUserCircle = faUserCircle;
}
