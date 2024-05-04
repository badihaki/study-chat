import { HttpClient } from '@angular/common/http';
import { Component, Input, inject } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Observable } from 'rxjs';

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

  saveMessage(e:Event|null){
    console.log("save msg");
    console.log(e);
    const btn = e?.target as HTMLButtonElement;
    
    this.http.post("http://localhost:3000/messages", {content:this.message?.msg.content, userEmail: this.userService.user?.email}).subscribe({
      next: ( res )=>{
        btn.disabled = true;
        console.log(res);
      },
      error: ()=>{},
    });
  }
}
