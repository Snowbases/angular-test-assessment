import { NgModule } from '@angular/core';

import { CarsTableModule } from './cars-table/cars-table.module';
import { CatTableModule } from './cat-table/cat-table.module';

@NgModule({
  exports: [
    CarsTableModule,
    CatTableModule
  ]
})
export class ComponentsModule {}
