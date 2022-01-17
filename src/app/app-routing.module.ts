import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';
import { HomeComponent} from '@modules/home';
import { MovieComponent } from '@modules/home/movie';
import { LoginComponent } from '@modules/login';


const routes: Routes = [
  { path: 'movies', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent},
  { path: 'movies/:id', component: MovieComponent },
  { path: '**', redirectTo: 'movies' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
