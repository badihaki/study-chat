import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import User from "../_interfaces/user.js"

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() { }
  user:User|null = null;
  currentChatRoom:string|undefined = undefined;

  setUser(newUser:User|null){
    this.user = newUser;
    // console.log(this.user);
  }
  getUser(){
    return this.user;
  }
  addToSavedMessages(message:{content:string, keywords:string[]}){
    this.user?.savedMessages.push(message);
  }
  logoutUser(){
    console.log("loggin' user OUT!!");
    localStorage.removeItem("sc-token");
    this.user = null;
  }
}
