import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { AuthenticationService } from 'app/services/authentication.service';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;
  private returnUrl: string;



  emailMatcher = new MyErrorStateMatcher();
  passwordMatcher = new MyErrorStateMatcher();



  



  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
  ) { }

  async ngOnInit() {

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.form = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(7)])
    });

    const loggedUser = this.authenticationService.checkAuthenticated()
    if (loggedUser.length > 0) {
      this.router.navigate([this.returnUrl]);
    }
  }

  onSubmit() {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        const username = this.form.get('email')?.value;
        const password = this.form.get('password')?.value;
        const loggedUser = this.authenticationService.login(username, password);
        if (loggedUser) {
          this.router.navigate([this.returnUrl]);
        }
      } catch (err) {
        this.loginInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
    
  }
}
