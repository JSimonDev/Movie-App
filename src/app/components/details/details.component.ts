import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { MovieDetails, Cast, Movie, Video } from '../../interfaces/interfaces';
import { ModalController, ToastController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service'
import { Browser } from "@capacitor/browser";
import { environment } from 'src/environments/environment';

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
  videos: Video[] = [];
  overviewLength: number | undefined = 0
  recommendedMovies: Movie[] = []
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
      this.movie = resp;
      this.overviewLength = resp.overview?.length
    });
    this.movieService.getMovieActors( this.id )
    .subscribe( resp => {
      this.actors = resp.cast;
    });
    this.movieService.getSimilar( this.id )
    .subscribe( resp => {
      this.recommendedMovies = resp.results;
    });
    this.movieService.getVideos( this.id )
    .subscribe( resp => {
      this.videos = resp.results;
    });
  }

  back() {
    this.modalCtrl.dismiss();
  }

  favorite() {
    this.storageService.saveRemoveMovie(this.movie);
  }

  openTrailer() {
    const key = this.videos[0].key
    Browser.open({ url: `${environment.videoPath}${key}` });
    // window.open( `${environment.videoPath}${key}` )
  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastCtrl.create({
      message: this.getToastMessage,
      duration: 1500,
      position
    });

    await toast.present();
  }
}

