import { Component, Input, output } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [FaIconComponent],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.css',
})
export class BadgeComponent {
  @Input() content!: { key: string; value: string };

  wasDeleted = output();
  protected readonly faTimes = faTimes;

  delete() {
    this.wasDeleted.emit();
  }
}
