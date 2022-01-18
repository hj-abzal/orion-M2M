import { IMovie } from 'app/interfaces';
import { DataService } from './../../services/data.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/services/authentication.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userName: string = '';
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  movies: IMovie[];
  constructor(
    private dataService: DataService,
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    private authenticationService: AuthenticationService,
  ) { 

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit(): void {
    const user: any = this.authenticationService.checkAuthenticated()
    if (user) {
      this.userName = user.login
    }
    this.dataService.getMovies()
      .subscribe(data => this.movies = data)
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout() {
    this.authenticationService.logout()
  }

}
