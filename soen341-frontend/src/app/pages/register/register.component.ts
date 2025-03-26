import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/services/authentication.service';
import {RegistrationRequest} from '../../services/models/registration-request';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

  registerRequest: RegistrationRequest = {email: '', firstname: '', lastname: '', password: ''};
  errorMsg: Array<string> = [];
  type: string = "password"
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash"

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
  }


  login() {
    this.router.navigate(['login']);
  }



  registerError: string = '';
register() {
  this.errorMsg = [];
  this.registerError = '';

  // Frontend validation
  if (!this.registerRequest.firstname.trim()) {
    this.errorMsg.push("First name is required.");
  }

  if (!this.registerRequest.lastname.trim()) {
    this.errorMsg.push("Last name is required.");
  }

  if (!this.registerRequest.email.trim()) {
    this.errorMsg.push("Email is required.");
  } else if (!this.registerRequest.email.includes('@')) {
    this.errorMsg.push("Email must contain '@'.");
  }

  if (!this.registerRequest.password.trim()) {
    this.errorMsg.push("Password is required.");
  } else if (this.registerRequest.password.length < 8) {
    this.errorMsg.push("Password must be at least 8 characters long.");
  }

  if (this.errorMsg.length > 0) return;

  this.authService.register({
    body: this.registerRequest
  }).subscribe({
    next: () => {
      this.router.navigate(['activate-account']);
    },
    error: (err) => {
      this.registerError = '';

      if (err.error?.validationErrors) {
        this.errorMsg = err.error.validationErrors;
      } else if (err.error?.message) {
        this.registerError = err.error.message;
      } else {
        this.registerError = "An unexpected error occurred. Please try again later.";
        console.error("Unhandled error format:", err);
      }
    }
  });
}




  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password"
  }
}