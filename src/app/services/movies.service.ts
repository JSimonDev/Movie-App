import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieDetails, AnswerMDB, AnswerCredits, Genre, GenreResponse, VideoAnswer } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';

const URL = environment.url;
const apiKey = environment.apiKey;


@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private popularPage = 0;
  genres: Genre[] = [];

  private executeQuery<T>(query: string) {
    query = URL + query;
    query += `&api_key=${apiKey}&language=es&include_image_language=es`;
    // console.log(query)
    return this.http.get<T>(query);
  }

  constructor(private http: HttpClient) { }

  getFeature() {

    const today = new Date();
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const month = today.getMonth() + 1;

    let monthString;

    if (month < 10) {
      monthString = "0" + month;
    } else {
      monthString = month;
    }

    const start = `${today.getFullYear()}-${monthString}-01`;
    const end = `${today.getFullYear()}-${monthString}-${lastDay}`;

    return this.executeQuery<AnswerMDB>(`/discover/movie?primary_release_date.gte=${start}&primary_release_date.lte=${end}`);
  }

  getPopular() {
    this.popularPage++;
    const query = `/discover/movie?sort_by=popularity.desc&page=${this.popularPage}`;
    return this.executeQuery<AnswerMDB>(query);
  }

  getKidPopular() {
    return this.executeQuery<AnswerMDB>('/discover/movie?with_genres=16&sort_by=popularity.desc')
  }

  getSuggestion() {
    const query = `/discover/movie?sort_by=popularity.desc&page=1`;
    return this.executeQuery<AnswerMDB>(query);
  }

  getSimilar(id: number) {
    return this.executeQuery<AnswerMDB>(`/movie/${id}/similar?hola=1`);
  }

  getMovieDetails(id: number) {
    return this.executeQuery<MovieDetails>(`/movie/${id}?hola=1`);
  }

  getMovieActors(id: number) {
    return this.executeQuery<AnswerCredits>(`/movie/${id}/credits?hola=1`);
  }

  getVideos(id: number) {
    return this.executeQuery<VideoAnswer>(`/movie/${id}/videos?hola=1`);
  }

  getGenre(): Promise<Genre[]> {
    return new Promise( resolve => {
      this.executeQuery<GenreResponse>(`/genre/movie/list?hola=1`)
        .subscribe(resp => {
          this.genres = resp['genres']
          resolve(this.genres);
        });
    });
  }

  searchMovies( value: string) {
    return this.executeQuery<AnswerMDB>(`/search/movie?query=${value}`);
  }
}
