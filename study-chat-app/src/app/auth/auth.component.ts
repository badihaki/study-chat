import { Component, OnInit, inject } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../_services/user.service';
import User from '../_interfaces/user';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    LoginComponent,
    SignupComponent
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit {
  userService = inject(UserService);
  http = inject(HttpClient);
  serverAddress:string = "http://localhost:3000/auth/";

  ngOnInit(): void {
    const token = localStorage.getItem("sc-token");
    // console.log(token);
    if(!this.userService.user && token){
      this.http.post(this.serverAddress, {"token":token}).subscribe({
        next: ( res ) => {
          // console.log("your response on load");
          // console.log(res);
          const {user} = res as {user:User};
          this.userService.setUser(user);
        },
        complete: () => {
          // console.log("completed");
        },
        error: ( err ) => {
          console.log("E R R O R");
          console.log(err);
          this.userService.setUser(null);
        }
      })
    }
  }
}
