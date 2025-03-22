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
register() {
  this.errorMsg = [];

  // Frontend validation
  if (!this.registerRequest.firstname.trim()) {
    this.errorMsg.push("First name is required.");
  }

  if (!this.registerRequest.lastname.trim()) {
    this.errorMsg.push("Last name is required.");
  }

  if (!this.registerRequest.email.trim()) {
    this.errorMsg.push("Email is required.");
  }

  if (!this.registerRequest.password.trim()) {
    this.errorMsg.push("Password is required.");
  }

  // If any errors, do not proceed
  if (this.errorMsg.length > 0) return;

  // Backend call if frontend validation passed
  this.authService.register({
    body: this.registerRequest
  })
    .subscribe({
      next: () => {
        this.router.navigate(['activate-account']);
      },
      error: (err) => {
        this.errorMsg = [];

        if (err.error && err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors;
        } else if (err.error && err.error.message) {
          this.errorMsg.push(err.error.message);
        } else {
          this.errorMsg.push("An unexpected error occurred. Please try again later.");
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