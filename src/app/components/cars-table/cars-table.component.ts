import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';

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
  filterDictionary = new Map<string, string>();

  constructor(public carService: CarService) {}

  ngOnInit(): void {
    this.carsFilters.push({
      name: 'brand',
      options: [
        'All',
        'Volkswagen',
        'BMW',
        'Mercedes-Benz'
      ],
      defaultValue: 'All'
    });

    this.carsFilters.push({
      name: 'type',
      options: [
        'All',
        'Golf',
        'GLC',
        'M3'
      ],
      defaultValue: 'All'
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.carService.getAllCarList().subscribe({
        next: (response) => {
          console.log('getTags response', response);
          this.cars = response;
          this.carsDataSource.data = this.cars;
        },
        error: (error) => {
          console.error('getTags error', error);
        }
      });
    }, 350);

    this.carsDataSource.paginator = this.matPaginator;
  }

  applyCarsFilter(matSelectChange: MatSelectChange, carsFilter: CarsFilter) {
    this.carsDataSource.filterPredicate = (car: Car, filter: string): boolean => {
      console.log('asd', car, 'filter', filter);

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
      console.log('car', car, 'filter', filter);
      console.log(
        'JSON.stringify(Array.from(this.filterDictionary.entries()));',
        JSON.stringify(Array.from(this.filterDictionary.entries()))
      );

      if (filter) {
        let value = filter.trim().toLowerCase();
        if (car.brand.toLowerCase().includes(value) || car.type.toLowerCase().includes(value)) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    };
    const filterValue = (event.target as HTMLInputElement).value;
    this.carsDataSource.filter = filterValue.trim().toLowerCase();
  }
}
