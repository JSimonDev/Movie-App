import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { MovieDetails, Cast } from '../../interfaces/interfaces';
import { ModalController, ToastController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service'

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  @Input() id!: number;
  movie: MovieDetails = {};
  hiddenText = 150;
  actors: Cast[] = [];
  slideOpt = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -10
  };

  get getToastMessage() {
    return this.storageService.getMessage
  }

  constructor(private movieService: MoviesService,
              private modalCtrl: ModalController,
              private storageService: StorageService,
              private toastCtrl: ToastController) {}

  ngOnInit() {
    this.movieService.getMovieDetails( this.id )
    .subscribe( resp => {
      this.movie = resp
    })
    this.movieService.getMovieActors( this.id )
    .subscribe( resp => {
      this.actors = resp.cast
    })
  }

  back() {
    this.modalCtrl.dismiss();
  }

  favorite() {
    this.storageService.saveRemoveMovie(this.movie);
  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastCtrl.create({
      message: this.getToastMessage,
      duration: 1500,
      position: position
    });

    await toast.present();
  }
}

