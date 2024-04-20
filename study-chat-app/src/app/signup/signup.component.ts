import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from "@angular/forms"

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  http = inject(HttpClient);
  
  signupForm:FormGroup = new FormGroup({
    email: new FormControl("",[
      Validators.required,
      Validators.email
    ]),
    password: new FormControl("", Validators.required),
    confirmPassword: new FormControl("", Validators.required),
    username: new FormControl("", Validators.required)
  })

  emailInputActive:boolean = false;
  setEmailActive(isActive:boolean){
    this.emailInputActive = isActive;
  }
  
  passInputActive:boolean = false;
  setPasswordActive(isActive:boolean){
    this.passInputActive = isActive;
  }
  
  passConfirmInputActive:boolean = false;
  setPasswordConfirmActive(isActive:boolean){
    this.passConfirmInputActive = isActive;
  }

  usernameInputActive:boolean = false;
  setUsernameActive(isActive:boolean){
    this.usernameInputActive = isActive;
  }

  handleSubmit(){
    console.log(this.signupForm.value);
    this.signupForm.reset();
  } 


}
