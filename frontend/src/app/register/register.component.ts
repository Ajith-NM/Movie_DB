import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  constructor(private apiService: ApiService, private route: Router) {}


  loginForm: FormGroup;
  signupForm: FormGroup;
  isLogin = true;
  err_msg = '';
  ngOnInit(): void {
    if (localStorage.getItem('loggedUser')) {
      this.route.navigateByUrl('/user');
    }
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      username: new FormControl('', [Validators.required]),
    });
  }

  changeIsLogin() {
    this.isLogin = !this.isLogin;
    this.loginForm.reset();
    this.signupForm.reset();
    this.err_msg = '';
  }
  onLogin() {
    this.apiService
      .postLogin(this.loginForm.value)
      .pipe(
        catchError((error) => {
          this.err_msg = '* ' + error.error.response;
          return throwError(
            () =>
              new Error('Oops! Something went wrong. Please try again later.')
          );
        })
      )
      .subscribe((data: { status: boolean; response: any }) => {
        if (data.status) {
          this.err_msg = '';
          console.log(data.response);
           


          localStorage.setItem('loggedUser', data.response.user_Id);
          this.route.navigateByUrl('/user');
        }
      });
  }
  onSignup() {
    console.log(this.signupForm.value);
    this.apiService
      .postSignup(this.signupForm.value)
      .pipe(
        catchError((error) => {
          this.err_msg = '* ' + error.error.response;
          return throwError(
            () =>
              new Error('Oops! Something went wrong. Please try again later.')
          );
        })
      )
      .subscribe((data: { status: boolean; response: any }) => {
        if (data.status) {
          this.changeIsLogin();
        }
        this.signupForm.reset();
      });
  }
}
