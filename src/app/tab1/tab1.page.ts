import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  peliculasRecientes: Movie[] = [];
  peliculasPopulares: Movie[] = [];
  peliculasPopularesInfantiles: Movie[] = [];
  

  constructor(private moviesService: MoviesService) {
  }
  
  getPopulares() {
    this.moviesService.getPopular()
    .subscribe(resp => {
      const arrTemp = [...this.peliculasPopulares, ...resp.results]
      this.peliculasPopulares = arrTemp;
    })
  }

  ngOnInit() {
    this.moviesService.getFeature()
    .subscribe(resp => {
      this.peliculasRecientes = resp.results;
    });
    this.moviesService.getKidPopular()
    .subscribe(resp => {
      this.peliculasPopularesInfantiles = resp.results;
    })
    this.getPopulares();
  };

  loadMore() {
    this.getPopulares();
  }
}


