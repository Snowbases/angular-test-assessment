import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-view-image',
  templateUrl: './modal-view-image.component.html',
  styleUrls: ['./modal-view-image.component.scss']
})
export class ModalViewImageComponent implements OnInit {

  constructor(
    public matDialogRef: MatDialogRef<ModalViewImageComponent>,
    @Inject(MAT_DIALOG_DATA) public matDialogData: any
  ) {}

  closeDialog(): void {
    this.matDialogRef.close();
  }

  ngOnInit(): void {
    console.log('matDialogData', this.matDialogData);
  }

}
