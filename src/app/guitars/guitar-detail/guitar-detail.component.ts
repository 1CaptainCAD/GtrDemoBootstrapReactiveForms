import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {IGuitar} from '../guitar';
import {GuitarService} from '../guitar.service';
import {GuitarBrandService} from '../guitar-brand.service';
import {IGuitarBrand} from '../guitar-brand';

@Component({
  selector: 'gtr-guitar-detail',
  templateUrl: './guitar-detail.component.html'
})
export class GuitarDetailComponent implements OnInit {
  pageTitle = 'Guitar Detail: ';
  guitar: IGuitar;
  guitarBrand: IGuitarBrand;
  errorMessage: string;

  constructor(private guitarService: GuitarService,
              private guitarBrandService: GuitarBrandService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getGuitar(id);
    }
  }

  getGuitar(id: number) {
    this.guitarService.getGuitar(id).subscribe(
      guitar => {
          this.guitar = guitar;
          this.pageTitle += ' ' + this.guitar.modelNumber;
        },
      error => this.errorMessage = <any>error
    );

    if (this.guitar) {
      this.guitarBrandService.getGuitarBrand(this.guitar.brandId).subscribe(
        brand => {
          this.guitarBrand = brand;
          this.pageTitle = `${this.guitarBrand.brandName} Guitar - Model # ${this.guitar.modelNumber}`;
        },
        error => this.errorMessage = <any>error
      );
    }
  }

  onBack(): void {
    this.router.navigate(['/guitars']);
  }
}
