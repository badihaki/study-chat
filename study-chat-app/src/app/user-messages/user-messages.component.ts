import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../_services/user.service';
import { HttpClient } from '@angular/common/http';
import { MessageCardComponent } from '../message-card/message-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-messages',
  standalone: true,
  imports: [
    MessageCardComponent
  ],
  templateUrl: './user-messages.component.html',
  styleUrl: './user-messages.component.scss'
})
export class UserMessagesComponent implements OnInit {
  router:Router = inject(Router);
  userService:UserService = inject(UserService);
  http:HttpClient = inject(HttpClient);
  serverAddress:string = "http://localhost:3000/messages";
  userMessages:{content:string, _id:string}[]|null = null;

  ngOnInit(): void {
    if(!this.userService.user){
      this.router.navigate(["/"]);
    }
    else{
      this.http.post(`${this.serverAddress}/${this.userService.user?._id}`, this.userService.user?.savedMessages).subscribe({
        next: (res) => {
          const parsedRes = res as {messages:[]};
          this.userMessages = parsedRes.messages;
        }
      })
    }
  }
}
