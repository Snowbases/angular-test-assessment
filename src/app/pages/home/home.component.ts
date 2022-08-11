import { Component, OnInit } from '@angular/core';

import { CatService } from '../../services/cat.service';

export interface CarsFilter {
  name: string;
  options: string[];
  defaultValue: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    './home.component.scss'
  ]
})
export class HomeComponent implements OnInit {
  constructor(public catService: CatService) {}

  ngOnInit(): void {}
}
