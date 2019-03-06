import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

import {IGuitar} from './guitar';
import {GuitarType} from './guitar-type.enum';
import {IPromise} from 'q';

@Injectable()
export class GuitarService {
  private guitarsUrl = 'api/guitars';
  private guitars: IGuitar[];

  constructor(private http: HttpClient) { }

  getGuitars(): Observable<IGuitar[]> {
    if (this.guitars) {
      return of(this.guitars);
    }

    return this.http.get<IGuitar[]>(this.guitarsUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        tap(data => this.guitars = data),
        catchError(this.handleError)
      );
  }

  getGuitar(id: number): Observable<IGuitar> {
    if (id === 0) {
      return of(this.initializeGuitar());
    }
    if (this.guitars) {
      const foundItem = this.guitars.find(item => item.id === id);
      if (foundItem) {
        return of(foundItem);
      }
    }

    const url = `${this.guitarsUrl}/${id}`;
    return this.http.get<IGuitar>(url)
      .pipe(
        tap(data => console.log(`Guitar Model = ${data.modelNumber}`)),
        catchError(this.handleError)
      );
  }

  deleteGuitar(id: number): Observable<{}> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const url = `${this.guitarsUrl}/${id}`;
    return this.http.delete<IGuitar>(url, {headers: headers})
                    .pipe(
                      tap(data => console.log('deleteProduct: ' + id)),
                      tap(data => {
                        const foundIndex = this.guitars.findIndex(item => item.id === id);
                        if (foundIndex > -1) {
                          this.guitars.splice(foundIndex, 1);
                        }
                      }),
                      catchError(this.handleError)
                    );
  }

  saveGuitar(guitar: IGuitar): Observable<IGuitar> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    if (guitar.id === 0) {
      return this.createGuitar(guitar, headers);
    }
    return this.updateGuitar(guitar, headers);
  }

  private createGuitar(guitar: IGuitar, headers: HttpHeaders): Observable<IGuitar> {
    guitar.id = null;
    return this.http.post<IGuitar>(this.guitarsUrl, guitar, { headers: headers })
                    .pipe(
                      tap(data => console.log('createGuitar: ' + JSON.stringify(data))),
                      tap( data => {
                        this.guitars.push(data);
                      }),
                      catchError(this.handleError)
                    );
  }

  private updateGuitar(guitar: IGuitar, headers: HttpHeaders): Observable<IGuitar> {
    const url = `${this.guitarsUrl}/${guitar.id}`;
    return this.http.put<IGuitar>(url, guitar, { headers: headers})
                    .pipe(
                      tap(() => console.log('updateGuitar: ' + guitar.id)),
                      tap(() => {
                        const exist = this.guitars.find(g => g.id === guitar.id);
                        if (exist) {
                          Object.assign(exist, guitar);
                        }
                      }),
                      catchError(this.handleError)
                    );
  }

  private initializeGuitar(): IGuitar {
    return {
      id: 0,
      brandId: 1,
      stringType: 'steel',
      guitarType: GuitarType.acoustic,
      numberOfStrings: 6,
      numberOfFrets: 20,
      scaleLength: 25.4,
      modelNumber: '',
      price: 0,
      description: '',
      rating: 5,
      imageUrl: '../../../assets/Images/GenericGuitar.jpg'
    };
  }

  private handleError(error: any) {
    console.error(error);
    return throwError(error);
  }
}
