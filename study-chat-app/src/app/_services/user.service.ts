import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import User from "../_interfaces/user.js"

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() { }
  http = inject(HttpClient);
  user:User|null = null;

  setUser(newUser:User|null){
    this.user = newUser;
    // console.log(this.user);
  }
  getUser(){
    return this.user;
  }
  removeUser(){
    console.log("removing user");
    this.user = null;
  }
}
