import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { MovieDetails } from 'src/app/interfaces/interfaces'

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage!: Storage | null;
  private _localMovies: MovieDetails[] = []
  message: string = "";

  constructor( private storage: Storage ) {
    this.init();
  }

  get getlocalMovies() {
    return [...this._localMovies]
  }

  get getMessage() {
    return this.message
  }

  async init() {
    const storage = await this.storage.create()
    this._storage = storage;
    this.loadFavorites();
  }

  async saveRemoveMovie( movie: MovieDetails ) {
    const exist = this._localMovies.find( localMovie => localMovie.id === movie.id)
    
    if ( exist ) {
      this._localMovies = this._localMovies.filter( localMovie => localMovie.id !== movie.id)
      this.message = 'Removido de Favoritos';
    } else {
      this._localMovies = [ movie, ...this._localMovies]
      this.message = 'Agregado a Favoritos';
    }
    this._storage?.set('movies', this._localMovies )
  }

  async loadFavorites() {
    try {
      const movies = await this._storage?.get('movies')
      this._localMovies = movies || [];
      // console.log("_localMovies",this._localMovies)
      return this._localMovies;
    } catch (error) {
      console.error('Error al cargar las películas favoritas:', error);
      return [];
    }
  }

  movieInFavorite(movie: MovieDetails) {
    return this._localMovies.find( localMovie => localMovie.id === movie.id)
  }
}
