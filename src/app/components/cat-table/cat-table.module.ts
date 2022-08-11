import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AngularMaterialModule } from '../../shared/angular-material.module';
import { CatTableComponent } from './cat-table.component';
import { ModalViewImageComponent } from './modal-view-image/modal-view-image.component';

@NgModule({
  declarations: [
    CatTableComponent,
    ModalViewImageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule
  ],
  exports: [
    CatTableComponent
  ]
})
export class CatTableModule {}
