import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { delay, lastValueFrom } from 'rxjs';

import { CarService } from '../../services/car.service';

export interface Car {
  id: number;
  brand: string;
  type: string;
}

export interface CarsFilter {
  name: string;
  options: string[];
  defaultValue: string;
}

@Component({
  selector: 'app-cars-table',
  templateUrl: './cars-table.component.html',
  styleUrls: [
    './cars-table.component.scss'
  ]
})
export class CarsTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) matPaginator: MatPaginator;

  cars: Car[];

  carsDataSource = new MatTableDataSource<Car>();

  carsColumns: string[] = [
    'id',
    'brand',
    'type'
  ];

  carsFilters: CarsFilter[] = [];
  filterDictionary = new Map<string, string>([
    [
      'brand',
      'All'
    ],
    [
      'type',
      'All'
    ]
  ]);

  constructor(public carService: CarService) {}

  ngOnInit(): void {
    this.initialize();
  }

  ngAfterViewInit() {
    this.carsDataSource.paginator = this.matPaginator;
  }

  initialize(): void {
    this.getAllCarBrand();
    this.getAllCarType();
    this.getAllCarList();
  }

  getAllCarBrand(): void {
    this.carService.getAllCarBrand().subscribe({
      next: (response) => {
        console.log('getAllCarBrand response', response);

        this.carsFilters.push({
          name: 'brand',
          options: [
            'All',
            ...response
          ],
          defaultValue: 'All'
        });
      },
      error: (error) => {
        console.error('getAllCarBrand error', error);
      }
    });
  }

  getAllCarType(): void {
    this.carService.getAllCarType().subscribe({
      next: (response) => {
        console.log('getAllCarType response', response);

        this.carsFilters.push({
          name: 'type',
          options: [
            'All',
            ...response
          ],
          defaultValue: 'All'
        });
      },
      error: (error) => {
        console.error('getAllCarType error', error);
      }
    });
  }

  getAllCarList(): void {
    this.carService.getAllCarList().pipe(delay(350)).subscribe({
      next: (response) => {
        console.log('getAllCarList response', response);
        this.cars = response;
        this.carsDataSource.data = this.cars;
      },
      error: (error) => {
        console.error('getAllCarList error', error);
      }
    });
  }

  async applyCarsFilter(matSelectChange: MatSelectChange, carsFilter: CarsFilter) {
    const resolveSelectedBrand = (): Promise<void> => {
      return new Promise<void>((resolve) => {
        if (carsFilter.name == 'brand' && carsFilter.defaultValue == 'All') {
          this.carsFilters = [];
          this.getAllCarBrand();
          this.getAllCarType();
          this.getAllCarList();
          this.filterDictionary.set('brand', matSelectChange.value);
          this.carsDataSource.filter = JSON.stringify(Array.from(this.filterDictionary.entries()));
          resolve();
        }

        if (carsFilter.name == 'brand' && carsFilter.defaultValue != 'All') {
          lastValueFrom(this.carService.getCarBrandType({ brand: carsFilter.defaultValue })).then((response) => {
            console.log('getCarBrandType', response);

            this.carsFilters = this.carsFilters.map((value) => {
              if (value.name == 'type') {
                return {
                  defaultValue: 'All',
                  name: 'type',
                  options: [
                    'All',
                    ...response.map((value: any) => value.type)
                  ]
                };
              }
              return value;
            });

            this.filterDictionary.set('brand', matSelectChange.value);
            this.filterDictionary.set('type', 'All');
            this.carsDataSource.filter = JSON.stringify(Array.from(this.filterDictionary.entries()));
            resolve();
          });
        }

        if (carsFilter.name == 'type') {
          resolve();
        }
      });
    };
    await resolveSelectedBrand();

    this.carsDataSource.filterPredicate = (car: Car, filter: string): boolean => {
      let map = new Map(JSON.parse(filter));
      let isMatch = false;

      for (let [
        key,
        value
      ] of map) {
        isMatch = value == 'All' || car[key as keyof Car] == value;
        if (!isMatch) return false;
      }

      return isMatch;
    };

    this.filterDictionary.set(carsFilter.name, matSelectChange.value);
    this.carsDataSource.filter = JSON.stringify(Array.from(this.filterDictionary.entries()));
  }

  applyCarsSearch(event: Event) {
    this.carsDataSource.filterPredicate = (car: Car, filter: string) => {
      let value = filter.trim().toLowerCase();

      if (car.brand.toLowerCase().includes(value)) {
        this.filterDictionary.set('brand', car.brand);
        this.carsDataSource.filter = JSON.stringify(Array.from(this.filterDictionary.entries()));
        return true;
      }

      if (car.type.toLowerCase().includes(value)) {
        this.filterDictionary.set('type', car.type);
        this.carsDataSource.filter = JSON.stringify(Array.from(this.filterDictionary.entries()));
        return true;
      }

      return false;
    };

    const filterValue = (event.target as HTMLInputElement).value;
    this.carsDataSource.filter = filterValue.trim().toLowerCase();
  }
}
