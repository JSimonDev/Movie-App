import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss'],
})
export class SkeletonComponent implements OnInit {
  slideOpt = {
    slidesPerView: 3.3,
    spaceBetween: -10,
    freeMode: true,
  };

  constructor() { }

  ngOnInit() {}

}
