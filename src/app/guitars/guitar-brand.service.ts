import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, of, throwError} from 'rxjs';
import { catchError, tap} from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

import { IGuitarBrand } from './guitar-brand';

@Injectable()
export class GuitarBrandService {
  private guitarBrandsUrl = 'api/brands';
  private guitarBrands: IGuitarBrand[];

  private selectBrandSource = new BehaviorSubject<IGuitarBrand | null>(null);
  selectedBrandChanges$ = this.selectBrandSource.asObservable();

  constructor(private http: HttpClient) { }

  changeSelectedBrand(selectedBrand: IGuitarBrand | null): void {
    this.selectBrandSource.next(selectedBrand);
  }

  getGuitarBrands(): Observable<IGuitarBrand[]> {
    if (this.guitarBrands) {
      return of(this.guitarBrands);
    }

    return this.http.get<IGuitarBrand[]>(this.guitarBrandsUrl)
                    .pipe(
                      tap(data => console.log(JSON.stringify(data))),
                      tap(data => this.guitarBrands = data),
                      catchError(this.handleError)
                    );
  }

  getGuitarBrand(id: number): Observable<IGuitarBrand> {
    if (this.guitarBrands) {
      const foundItem = this.guitarBrands.find(item => item.id === id);
      if (foundItem) {
        return of(foundItem);
      }
    }

    const url = `${this.guitarBrandsUrl}/${id}`;
    return this.http.get<IGuitarBrand>(url)
                    .pipe(
                      tap(data => console.log(`Guitar Brand = ${data.brandName}`)),
                      catchError(this.handleError)
                    );
  }

  private handleError(error: any) {
    console.error(error);
    return throwError(error);
  }
}



