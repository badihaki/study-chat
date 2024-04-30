import { Component, Inject, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { ChatService } from '../_services/chat.service';

@Component({
  selector: 'app-chat-room',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.scss'
})
export class ChatRoomComponent implements OnInit {
  constructor(
    private router: Router,
    private userService:UserService,
    private chatService:ChatService
  ){}
  
    ngOnInit(): void {
      if(!this.userService.user){
        this.router.navigate(["/"]);
      }

      // this.chatService.getMessages().subscribe( (msg) => {
      //   this.messages.push(msg as {_id:string, content:string});
      // })
    }

  messages:{_id:string, content:string}[] = [];
  
  messageForm:FormGroup = new FormGroup({
    content: new FormControl("", Validators.required)
  });

  handleSubmit(){
    console.log(this.messageForm.value);
    this.chatService.sendMessage(this.messageForm.value);
  }
}
