import { HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';

import { CatService } from '../../services/cat.service';
import { ModalViewImageComponent } from './modal-view-image/modal-view-image.component';

@Component({
  selector: 'app-cat-table',
  templateUrl: './cat-table.component.html',
  styleUrls: [
    './cat-table.component.scss'
  ]
})
export class CatTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) matPaginator: MatPaginator;

  cat: string[] = [];

  catDataSource = new MatTableDataSource<string>();

  catColumns: string[] = [
    'tags',
    'view'
  ];

  constructor(public domSanitizer: DomSanitizer, public matDialog: MatDialog, public catService: CatService) {}

  ngOnInit(): void {
    this.catService.getTags().subscribe({
      next: (response) => {
        console.log('getTags response', response);
        this.cat = response.map((value: any) => ({ tags: value }));
        this.catDataSource.data = this.cat;
      },
      error: (error) => {
        console.error('getTags error', error);
      }
    });
  }

  ngAfterViewInit() {
    this.catDataSource.paginator = this.matPaginator;
  }

  openModalViewImage(tag: string): void {
    this.catService.getCatFactsText().subscribe({
      next: (response: any) => {
        console.log('getCatFactsText response', response);

        let factsText: string = response.data[0];
        let encodedTag: string = encodeURIComponent(tag);

        this.catService
          .getRandomGeneratedCatImage({
            tag: encodedTag,
            factsText: factsText
          })
          .subscribe({
            next: (response: HttpResponse<Blob>) => {
              console.log('getRandomGeneratedCatImage response', response);

              let blobImage = response.body;
              if (blobImage != null && blobImage != undefined) {
                const url = window.URL.createObjectURL(blobImage);
                let blobImageUrl = this.domSanitizer.bypassSecurityTrustUrl(url);

                const matDialogRef = this.matDialog.open(ModalViewImageComponent, {
                  maxWidth: '95vw',
                  data: {
                    tag: tag,
                    factsText: factsText,
                    blobImageUrl: blobImageUrl
                  }
                });

                matDialogRef.afterClosed().subscribe((result: any) => {
                  console.log('matDialogRef afterClosed result', result);
                });
              }
            },
            error: (error) => {
              console.error('getRandomGeneratedCatImage error', error);
            }
          });
      },
      error: (error) => {
        console.error('getCatFactsText error', error);
      }
    });
  }
}
