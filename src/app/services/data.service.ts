import { ICharacter, IMovie, GetMovies, IPlanet, IStarship } from 'app/interfaces';
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
    return this.http.get<GetMovies>(this.url).pipe(map(data => data.results))
  }

  getMovieById(id: number) {
    return this.http.get<IMovie>(`https://swapi.dev/api/films/${id}`)
  }
  getDetails(url: string) {
    return this.http.get<ICharacter | IPlanet | IStarship>(url)
  }
}
