import { Component, Inject, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-chat-room',
  standalone: true,
  imports: [],
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.scss'
})
export class ChatRoomComponent implements OnInit {
  constructor(
    // private router: Router
  ){}
  messages:{_id:string, content:string}[] = [];
  userService = Inject(UserService);
  router = inject(Router);

  messageForm:FormGroup = new FormGroup({
    content: new FormControl("", Validators.required)
  });

  ngOnInit(): void {
    if(!this.userService.user){
      this.router.navigate(["/"]);
    }
  }
}
