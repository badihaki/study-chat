import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  http = inject(HttpClient);
  serverAddress:string = "http://localhost:3000/auth/login";

  loginForm:FormGroup = new FormGroup({
    email: new FormControl("", [
      Validators.email,
      Validators.required
    ]),
    password: new FormControl("", Validators.required)
  });

  emailInputActive:boolean = false;
  setEmailActive(isActive:boolean){
    this.emailInputActive = isActive;
  }
  
  passInputActive:boolean = false;
  setPasswordActive(isActive:boolean){
    this.passInputActive = isActive;
  }
  
  handleSubmit(){
    console.log(this.loginForm.value);
    this.http.post(this.serverAddress, this.loginForm).subscribe({
      next: (res)=>{
        console.log(res);
      },
      error: (err)=>{
        console.log(err.error);
      },
      complete: ()=>{
        console.log("complete, do stuff");
      }
    })
    this.loginForm.reset();
  } 

}
