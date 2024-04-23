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

  formErrorMessage:string = "";
  
  handleSubmit(){
    if(this.loginForm.valid){
      this.http.post(this.serverAddress, this.loginForm.value).subscribe({
        next: (res)=>{
          console.log(res);
          const { user, token } = res as {user:{}, token:string};
          localStorage.setItem("sc-token", token);
        },
        error: (err)=>{
          console.log(err.error);
          this.formErrorMessage = err.error.error;
          console.log(this.formErrorMessage);
          setTimeout(() => {
            this.formErrorMessage = "";
          }, 5000);
        },
        complete: ()=>{
          console.log("complete, do stuff");
        }
      })
    }
    else{
      this.formErrorMessage = "Error with form! Please retry!!";
      setTimeout(() => this.formErrorMessage = "" , 5000);
    }
    this.loginForm.reset();
  } 

}
