import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieComponent } from './movie.component';
import { MatCardModule } from '@angular/material/card';
import { TableComponent } from './table/table.component';
import { ModalComponent } from './modal/modal.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    MovieComponent,
    TableComponent,
    ModalComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatDialogModule
  ]
})
export class MovieModule { }
