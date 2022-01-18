import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';
import { HomeComponent } from '@modules/home';
import { MovieComponent } from '@modules/movie';
import { LoginComponent } from '@modules/login';
import { AllMoviesComponent } from '@modules/home/all-movies/all-movies.component';


const routes: Routes = [
  {
    path: 'movies', component: HomeComponent, children: [
      { path: '', redirectTo: 'all', pathMatch: 'full' },
      { path: 'all', component: AllMoviesComponent, pathMatch: 'full' },
      { path: ':id', component: MovieComponent, pathMatch: 'full' }
    ], canActivate: [AuthGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'movies' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
