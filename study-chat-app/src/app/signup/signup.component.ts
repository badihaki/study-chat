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
  serverAddress:string = "http://localhost:3000/auth/signup";
  
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

  formErrorMessage:string = "";

  handleSubmit(){
    this.http.post(this.serverAddress, this.signupForm.value).subscribe({
      next: ( res )=>{
        console.log(res);
      },
      error: ( err )=>{
        console.log(err.error);
        this.formErrorMessage = err.error.error;
        setTimeout(() => {
          this.formErrorMessage = "";
        }, 5000);
      },
      complete: ()=>{
        console.log("completed, do stuff");
      }
    })
    this.signupForm.reset();
  } 


}
