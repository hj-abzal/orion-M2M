import { IMovie } from './../../interfaces/movie';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  movies: IMovie[];
  constructor(private dataService: DataService) { }
  
  ngOnInit(): void {
    this.dataService.getMovies()
        .subscribe(data => this.movies = data)
  }

}
