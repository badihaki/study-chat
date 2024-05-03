import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { ChatService } from '../_services/chat.service';
import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-chat-room',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ChatMessageComponent,
  ],
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.scss'
})
export class ChatRoomComponent implements OnInit {
  constructor(
    public userService:UserService,
    private chatService:ChatService,
  ){}
  
    ngOnInit(): void {
      this.chatService.getMessages().subscribe( (msg) => {
        console.log(msg);
      this.messages.push(msg as {_id:string, msg:{ content:string }, user:string });
    })
    }

  messages:{_id:string, msg:{ content:string }, user:string }[] = [];
  
  messageForm:FormGroup = new FormGroup({
    content: new FormControl("", Validators.required)
  });

  handleSubmit(){
    if(this.messageForm.valid){
      const msg = { msg: this.messageForm.value, user:this.userService.user?.username } 
      this.chatService.sendMessage(msg);
      this.messageForm.reset();
    }
  }

}
