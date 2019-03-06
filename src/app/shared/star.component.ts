import {Component, Input, OnChanges} from '@angular/core';

@Component({
  selector: 'gtr-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnChanges {
  @Input() rating: number;
  starPercent: string;

  ngOnChanges(): void {
    this.starPercent = Math.round(this.rating * 70 / 5) + 'px';
  }
}
