import { Component, Input } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [FaIconComponent, NgStyle],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.css',
})
export class RatingComponent {
  @Input() rating!: number;

  protected readonly faStar = faStar;
}
