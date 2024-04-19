import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, ValidationErrors, AbstractControl } from "@angular/forms"

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
  
  signupForm:FormGroup = new FormGroup({
    email: new FormControl("",[
      Validators.required,
      Validators.email
    ]),
    password: new FormControl("", Validators.required),
    confirmPassword: new FormControl("", Validators.required),
    username: new FormControl("", Validators.required)
  })

  handleSubmit(){
    console.log(this.signupForm.value);
    this.signupForm.reset();
  } 


}
