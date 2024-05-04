import { HttpClient } from '@angular/common/http';
import { Component, Input, inject } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-chat-message',
  standalone: true,
  imports: [],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.scss'
})
export class ChatMessageComponent {
  @Input() message?:{ _id:string, msg:{ content:string }, user:string }|null

  http = inject(HttpClient);
  serverAddress = ""
  userService = inject(UserService);
  messageSaved:boolean = false;

  saveMessage(){
    console.log("save msg");
    this.http.post("localhost:3000/messages", {content:this.message?.msg.content, userEmail: this.userService.user?.email}).subscribe({
      next: ()=>{
        this.messageSaved = true;
      },
      error: ()=>{},
    });
  }
}
