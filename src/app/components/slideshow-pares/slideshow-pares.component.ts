import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {
  @Input() peliculas: Movie[] = [];
  @Output() loadMore = new EventEmitter();
  slideOpt = {
    slidesPerView: 3.3,
    freeMode: false,
    spaceBetween: -10
  };

  constructor( private modalCtrl: ModalController ) { }

  ngOnInit() {}

  onClick() {
    this.loadMore.emit()
  }

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
