import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Car {
  id: number;
  brand: string;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class CarService {
  cars: Car[] = [
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
      brand: 'Mercedes-Benz',
      type: 'Coupe'
    }
  ];

  constructor() {}

  getAllCarList(): Observable<any> {
    return of(this.cars);
  }

  getAllCarBrand(): Observable<any> {
    return of([
      ...new Set(this.cars.map((item) => item.brand))
    ]);
  }

  getAllCarType(): Observable<any> {
    return of([
      ...new Set(this.cars.map((item) => item.type))
    ]);
  }

  getCarBrandType(data: { brand: string }): Observable<any> {
    const { brand } = data;
    return of(this.cars.filter((o: any) => o.brand == brand));
  }
}
