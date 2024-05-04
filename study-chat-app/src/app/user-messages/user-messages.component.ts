import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../_services/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-messages',
  standalone: true,
  imports: [],
  templateUrl: './user-messages.component.html',
  styleUrl: './user-messages.component.scss'
})
export class UserMessagesComponent implements OnInit {
  userService:UserService = inject(UserService);
  http:HttpClient = inject(HttpClient);
  serverAddress:string = "http://localhost:3000/messages";

  ngOnInit(): void {
    // console.log(this.userService.user?._id);
    this.http.post(`${this.serverAddress}/${this.userService.user?._id}`, this.userService.user?.savedMessages).subscribe( (res) => {
      console.log(res);
    })
  }

  getUseInfor(){
    console.log(this.userService.user);
  }
}
