import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [NgIf, NgClass, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  isSignIn: boolean = true;
  signInKey: string = this.isSignIn.toString();
  loggedInFailed: boolean = false;
  isUserSignInFormText: {
    [key: string]: {
      formTitle: string;
      submitButtonText: string;
      submit: Function;
      note: string;
      failMessage: string;
    };
  } = {
    true: {
      formTitle: 'Sign in',
      submitButtonText: 'Sign in',
      submit: this.signIn.bind(this),
      note: "Don't you have an account yet?",
      failMessage: 'Error occurred while sign in!',
    },
    false: {
      formTitle: 'Sign up',
      submitButtonText: 'Sign up',
      submit: this.signUp.bind(this),
      note: 'Do you already have an account?',
      failMessage:
        'Error occurred during registration! Please, try again later.',
    },
  };
  authForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(7),
      Validators.pattern('^(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d_]*$'),
    ]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  get email() {
    return this.authForm.get('email');
  }

  get password() {
    return this.authForm.get('password');
  }

  signIn(): void {
    const authFormValues = this.authForm.value;
    this.authService
      .signIn(authFormValues.email, authFormValues.password)
      .subscribe(
        (result) => {
          this.loggedInFailed = !result;
          if (result) {
            this.navigateToHomePage();
          }
        },
        () => {
          this.loggedInFailed = true;
        },
      );
  }

  signUp(): void {
    const authFormValues = this.authForm.value;
    this.authService
      .signUp(new User(authFormValues.email, authFormValues.password))
      .subscribe(
        (result) => {
          this.loggedInFailed = !result;
          this.navigateToHomePage();
        },
        () => {
          this.loggedInFailed = true;
        },
      );
  }

  navigateToHomePage() {
    this.router.navigate(['/'], { replaceUrl: true });
  }

  toggleSignIn() {
    this.isSignIn = !this.isSignIn;
    this.signInKey = this.isSignIn.toString();
    this.authForm.reset();
  }
}
