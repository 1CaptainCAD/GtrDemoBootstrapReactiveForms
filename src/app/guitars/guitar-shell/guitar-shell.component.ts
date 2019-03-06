import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {GuitarBrandService} from '../guitar-brand.service';

@Component({
  templateUrl: './guitar-shell.component.html',
})
export class GuitarShellComponent implements OnInit, OnDestroy {
  selectedBrand: string;
  sub: Subscription;

  constructor(private guitarBrandService: GuitarBrandService) { }

  ngOnInit() {
    this.sub = this.guitarBrandService.selectedBrandChanges$.subscribe(
      selectedBrand => {
        if (selectedBrand) {
          this.selectedBrand = selectedBrand.brandName;
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
