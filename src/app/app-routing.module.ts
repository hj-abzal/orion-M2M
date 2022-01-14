import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@modules/home';
import { LoginComponent } from '@modules/login/login.component';
import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  { path: 'movies', component: HomeComponent, canActivate: [AuthGuard] },
  {path: 'login', component: LoginComponent},
  { path: '**', redirectTo: 'movies' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
