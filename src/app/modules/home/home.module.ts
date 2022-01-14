import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AppRoutingModule } from 'app/app-routing.module';
import { MatGridListModule } from '@angular/material/grid-list'
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    HomeComponent,
    TopBarComponent,
    NavBarComponent,
  ],
  imports: [
    MatGridListModule,
    CommonModule,
    AppRoutingModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
