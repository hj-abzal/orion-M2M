import { IMovie, GetMovies } from './../interfaces/movie';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  url = 'https://swapi.dev/api/films'
  constructor(private http: HttpClient) { }

  getMovies() {
    return this.http.get<GetMovies>(this.url).pipe(map(data => data.results.sort( (a, b) => a.episode_id - b.episode_id)))
  }
}
