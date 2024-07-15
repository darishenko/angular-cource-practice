import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  @Output() wasDeleted = new EventEmitter();

  delete() {
    this.wasDeleted.emit();
  }

  protected readonly faTimes = faTimes;
}
