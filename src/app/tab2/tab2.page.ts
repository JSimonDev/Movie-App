import { Component, OnInit, ViewChild } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../interfaces/interfaces';
import { IonSearchbar } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { DetailsComponent } from '../components/details/details.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  suggestions: Movie[] = [];
  suggestionSelected: string = "";
  @ViewChild('mySearchBar') searchBar!: IonSearchbar;
  searchedMovies: Movie[] = [];
  searching: boolean = false;

  constructor(private movieService: MoviesService,
              private modalCtrl: ModalController) {}

  ngOnInit() {
    this.movieService.getSuggestion()
    .subscribe( resp => {
      this.suggestions = resp.results.slice(0,11)
    })
  }

  searchThis( suggestion: string ) {
    this.suggestionSelected = suggestion;
    this.searchBar.setFocus();
  }

  search( event: any ) {
    const value: string = event.detail.value;
    this.searching = true;
    this.movieService.searchMovies(value)
    .subscribe(resp => {
      this.searchedMovies = resp.results;
      this.searching = false;
    });
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
