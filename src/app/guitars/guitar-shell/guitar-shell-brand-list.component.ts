import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {IGuitarBrand} from '../guitar-brand';
import {GuitarBrandService} from '../guitar-brand.service';

@Component({
  selector: 'gtr-guitar-shell-brand-list',
  templateUrl: './guitar-shell-brand-list.component.html',
  styleUrls: ['./guitar-shell-brand-list.component.css']
})
export class GuitarShellBrandListComponent implements OnInit, OnDestroy {
  pageTitle = 'Guitar Brands';
  errorMessage: string;
  guitarBrands: IGuitarBrand[];
  selectedBrand: IGuitarBrand | null;
  sub: Subscription;

  constructor(private guitarBrandService: GuitarBrandService) { }

  ngOnInit(): void {
    this.sub = this.guitarBrandService.selectedBrandChanges$.subscribe(
      selectedBrand => this.selectedBrand = selectedBrand
    );

    this.guitarBrandService.getGuitarBrands().subscribe(
      (data: IGuitarBrand[]) => {
        this.guitarBrands = data;
        console.log(data);
      },
      (error: any) => this.errorMessage = <any>error
    );

    if (this.errorMessage) {
      console.log(this.errorMessage);
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onSelected(brand: IGuitarBrand) {
    this.guitarBrandService.changeSelectedBrand(brand);
  }
}
