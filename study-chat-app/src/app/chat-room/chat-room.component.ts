import { Component, Inject, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';

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
    private userService:UserService
  ){}
  
    ngOnInit(): void {
      if(!this.userService.user){
        this.router.navigate(["/"]);
      }
    }

  messages:{_id:string, content:string}[] = [];
  
  messageForm:FormGroup = new FormGroup({
    content: new FormControl("", Validators.required)
  });

  handleSubmit(){
    console.log(this.messageForm.value);
  }
}
