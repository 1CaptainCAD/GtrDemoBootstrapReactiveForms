import {Component, OnDestroy, OnInit} from '@angular/core';
import {GuitarService} from '../guitar.service';
import {IGuitar} from '../guitar';
import {IGuitarBrand} from '../guitar-brand';
import {Subscription} from 'rxjs';
import {GuitarBrandService} from '../guitar-brand.service';

@Component({
  selector: 'gtr-guitar-shell-list',
  templateUrl: './guitar-shell-list.component.html',
  styleUrls: ['./guitar-shell-list.component.css']
})
export class GuitarShellListComponent implements OnInit, OnDestroy {

  pageTitle = 'Guitars';
  errorMessage: string;
  filteredGuitars: IGuitar[] | null;
  guitars: IGuitar[] | null;
  selectedBrand: IGuitarBrand | null;
  sub: Subscription;

  constructor(private guitarService: GuitarService,
              private guitarBrandService: GuitarBrandService) { }

  ngOnInit() {
    this.sub = this.guitarBrandService.selectedBrandChanges$.subscribe(
      selectedBrand => {
        this.selectedBrand = selectedBrand;
        this.filterGuitars(selectedBrand);
      }
    );

    this.guitarService.getGuitars().subscribe(
      (data: IGuitar[]) => {
        this.guitars = data;
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

  private filterGuitars(selectedBrand?: IGuitarBrand): void {
    if (selectedBrand && this.guitars) {
      this.filteredGuitars = this.guitars.filter(guitar => {
        if (guitar.brandId === selectedBrand.id) {
          return true;
        } else {
          return false;
        }
      });
    }
  }
}
