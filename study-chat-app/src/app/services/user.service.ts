import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import User from "../interfaces/user.js"

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() { }
  http = inject(HttpClient);
  user?:User|null = null;

  setUser(newUser:User){
    this.user = newUser;
    console.log(this.user);
  }
  removeUser(){
    this.user = null;
  }

}
