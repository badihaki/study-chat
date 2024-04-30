import { Component, Inject, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { ChatService } from '../_services/chat.service';
import { ChatMessageComponent } from '../chat-message/chat-message.component';

@Component({
  selector: 'app-chat-room',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ChatMessageComponent
  ],
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.scss'
})
export class ChatRoomComponent implements OnInit {
  constructor(
    private router: Router,
    private userService:UserService,
    private chatService:ChatService,
  ){}
  
    ngOnInit(): void {
      if(!this.userService.user){
        this.router.navigate(["/"]);
      }
      else{
        this.chatService.getMessages().subscribe( (msg) => {
        // console.log(msg);
        this.messages.push(msg as {_id:string, msg:{ content:string }, user:string });
        })
      }
    }

  messages:{_id:string, msg:{ content:string }, user:string }[] = [];
  
  messageForm:FormGroup = new FormGroup({
    content: new FormControl("", Validators.required)
  });

  handleSubmit(){
    // console.log(this.messageForm.value);
    // console.log(this.userService.user?.username);
    // console.log(this.messageForm.valid);
    if(this.messageForm.valid){
      const msg = { msg: this.messageForm.value, user:this.userService.user?.username } 
      this.chatService.sendMessage(msg);
      this.messageForm.reset();
    }
  }
}
