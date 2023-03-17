import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {
  @Input() peliculas: Movie[] = [];
  slideOpt = {
    slidesPerView: 3.3,
    freeMode: true,
  };

  constructor( private modalCtrl: ModalController ) { }

  ngOnInit() {}

  async showDetails( id: number ) {
    const modal = await this.modalCtrl.create({
      component: DetailsComponent,
      componentProps: {
        id
      }
    });
    modal.present();
  }
}
