import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICharacter } from 'app/interfaces/character';
import { IMovie, ITable, IPlanet, IStarship } from 'app/interfaces';
import { DataService } from 'app/services/data.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '@modules/home/movie/modal/modal.component';
import { TableDatatTransferType } from './table/table.component';



@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  movie: IMovie;

  starships: IStarship[] | any = [];
  starshipsTitles: string[] = ['name', 'starship_class', 'passengers', 'length', 'created']

  characters: ICharacter[] | any = [];
  chatactersTitles: string[] = ['name', 'gender', 'height', 'mass', 'created'];

  planets: IPlanet[] | any = [];
  planetsTitles: string[] = ['name', 'climate', 'gravity', 'population', 'created'];

  tables: ITable[] = [
    { tableTitle: 'starships', titles: this.starshipsTitles, data: this.starships },
    { tableTitle: 'characters', titles: this.chatactersTitles, data: this.characters },
    { tableTitle: 'planets', titles: this.planetsTitles, data: this.planets },
  ]
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    public matDialog: MatDialog
  ) { }
  openModal($event: TableDatatTransferType) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "450px";
    dialogConfig.width = "600px";
    dialogConfig.data = {
      $event,
      titles: {
        starships: this.starshipsTitles,
        characters: this.chatactersTitles,
        planets: this.planetsTitles
      }
    }
    this.matDialog.open(ModalComponent, dialogConfig);
  }


  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const movieId = Number(routeParams.get('id'));

    this.dataService.getMovieById(movieId)
      .subscribe(data => {
        this.movie = data


        data.starships.map(url => {
          this.dataService.getDetails(url)
            .subscribe(res => {
              this.starships.push(res)
            })
        })

        data.characters.map(url => {
          this.dataService.getDetails(url)
            .subscribe(res => {
              this.characters.push(res)
            })
        })

        data.planets.map(url => {
          this.dataService.getDetails(url)
            .subscribe(res => {
              this.planets.push(res)
            })
        })


      })
  }

}
