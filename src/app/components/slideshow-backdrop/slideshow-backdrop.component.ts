import { Component, OnInit, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { Movie } from "../../interfaces/interfaces";
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: "app-slideshow-backdrop",
  templateUrl: "./slideshow-backdrop.component.html",
  styleUrls: ["./slideshow-backdrop.component.scss"],
})
export class SlideshowBackdropComponent implements OnInit {
  @Input() peliculas: Movie[] = [];
  slideOpt = {
    slidesPerView: 1.1,
    freeMode: true,
  };

  constructor( private modalCtrl: ModalController ) {}

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
