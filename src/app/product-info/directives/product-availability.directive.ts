import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appProductAvailability]',
  standalone: true,
})
export class ProductAvailabilityDirective implements OnChanges {
  @Input() availableCount!: number;

  private readonly AVAILABILITY_OPTIONS = [
    {
      value: 'In stock',
      color: 'green',
      minCount: 10,
    },
    {
      value: 'Almost sold out',
      color: 'orange',
      minCount: 1,
    },
    {
      value: 'Out of stock',
      color: 'red',
      minCount: 0,
    },
  ];

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['availableCount']) {
      const availability = this.getAvailability(this.availableCount);

      this.renderer.setStyle(
        this.elementRef.nativeElement,
        'color',
        availability.color,
      );
      this.renderer.setProperty(
        this.elementRef.nativeElement,
        'innerText',
        availability.value,
      );
    }
  }

  private getAvailability(count: number) {
    return (
      this.AVAILABILITY_OPTIONS.find((option) => count >= option.minCount) ||
      this.AVAILABILITY_OPTIONS[this.AVAILABILITY_OPTIONS.length - 1]
    );
  }
}
