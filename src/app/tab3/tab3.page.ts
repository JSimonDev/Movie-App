import { Component, OnInit, ViewChild, AfterContentChecked, DoCheck } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { MovieDetails, Genre, FavoriteByGenre } from '../interfaces/interfaces';
import { DetailsComponent } from '../components/details/details.component';
import { ModalController } from '@ionic/angular';
import { MoviesService } from '../services/movies.service';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit, DoCheck {
  // categories: string[] = ["Acción","entertainment","general","health","science","sports","technology"];
  movies: MovieDetails[] = [];
  genres: Genre[] = [];
  selectedCategory: string = "Acción";
  slideIndex: number = 0;
  favoriteByGenre: FavoriteByGenre[] = []

  get getMovies(): MovieDetails[] {
    return this.storageService.getlocalMovies;
  }

  @ViewChild('slides', { static: true }) slides!: IonSlides;

  constructor(private storageService: StorageService,
              private modalCtrl: ModalController,
              private moviesService: MoviesService) {
    this.favoriteByGenre = [{ genre: 'Acción', movie: [] }];
  }


  async ngOnInit() {
    await this.storageService.loadFavorites();
    this.genres = await this.moviesService.getGenre();
    // console.log("Genres", this.genres)
    // console.log("GetMovies", this.getMovies)
  }

  ngDoCheck() {
    // this.moviesByGenre(this.genres, this.movies);
    this.movies = this.storageService.getlocalMovies;
    // console.log("favoriteByGenre", this.favoriteByGenre)
    // console.log("Movies", this.movies)
  }


  segmentChanged(event: Event) {
    // this.selectedCategory = (event as CustomEvent).detail.value;
    // this.newsService.getTopHeadlinesByCategory(this.selectedCategory).subscribe(articles => {
    //   this.articles = [...articles]
    // })
    console.log("Hola")
  }

  ionSlideDidChange() {
    this.slides.getActiveIndex().then(index => {
      this.slideIndex = index;
      this.selectedCategory = this.genres[index].name;
    });
  }

  async showDetails( id: number | undefined ) {
    const modal = await this.modalCtrl.create({
      component: DetailsComponent,
      componentProps: {
        id
      }
    });
    modal.present();
  }

  // moviesByGenre(genres: Genre[], movies: MovieDetails[]) {

  //   this.favoriteByGenre = [];

  //   genres.forEach(genres => {
  //     this.favoriteByGenre.push({
  //       genre: genres.name,
  //       movie: movies.filter(movie => {
  //         return movie.genres?.find(genre => genre.id === genres.id);
  //       })
  //     });
      
  //   });

  // }

}
