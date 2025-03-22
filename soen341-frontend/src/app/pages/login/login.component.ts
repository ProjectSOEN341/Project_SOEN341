import { Component } from '@angular/core';
import { AuthenticationRequest } from '../../services/models/authentication-request'
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/services/authentication.service';
import {TokenService} from '../../services/token/token.service';
import { UserService } from '../../services/userService.service';


@Component({
  selector: 'app-login',
//  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  authRequest : AuthenticationRequest = {email: '', password:''};
  errorMsg: Array<string> = [];
  type: string = "password"
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash"

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenService,
    private userService:UserService
  ) {
  }
loginError: string = ''; 
login() {
  this.errorMsg = [];
  this.loginError = '';

  // Frontend validation
  if (!this.authRequest.email.trim()) {
    this.errorMsg.push("Email is required.");
  } else if (!this.authRequest.email.includes('@')) {
    this.errorMsg.push("Email must contain '@'.");
  }

  if (!this.authRequest.password.trim()) {
    this.errorMsg.push("Password is required.");
  } else if (this.authRequest.password.length < 8) {
    this.errorMsg.push("Password must be at least 8 characters long.");
  }

  if (this.errorMsg.length > 0) return;

  this.authService.authenticate({
    body: this.authRequest
  }).subscribe({
    next: (res) => {
      this.tokenService.token = res.token as string;
      this.router.navigate(['home']);
      this.userService.setLoginUser(this.authRequest);
    },
    error: (err) => {
      console.log(err);
      if (err.error?.validationErrors) {
        this.errorMsg = err.error.validationErrors;
      } else if (err.error?.error) {
        this.loginError = err.error.error;
      } else {
        this.loginError = "An unexpected error occurred. Please try again later.";
      }
    }
  });
}

  register() {
    this.router.navigate(['register']);
  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password"
  }
}



