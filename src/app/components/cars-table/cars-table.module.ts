import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AngularMaterialModule } from '../../shared/angular-material.module';
import { CarsTableComponent } from './cars-table.component';



@NgModule({
  declarations: [
    CarsTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule
  ],
  exports: [
    CarsTableComponent
  ]
})
export class CarsTableModule { }
