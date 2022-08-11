import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  constructor() {}

  getAllCarList(): Observable<any> {
    return of([
      {
        id: 1,
        brand: 'Volkswagen',
        type: 'Golf'
      },
      {
        id: 2,
        brand: 'BMW',
        type: 'Golf'
      },
      {
        id: 3,
        brand: 'Mercedes-Benz',
        type: 'GLC'
      },
      {
        id: 4,
        brand: 'BMW',
        type: 'M3'
      }
    ]);
  }
}
