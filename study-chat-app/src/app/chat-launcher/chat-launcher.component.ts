import { Component } from '@angular/core';
import { ChatService } from '../_services/chat.service';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ChatRoomComponent } from '../chat-room/chat-room.component';

@Component({
  selector: 'app-chat-launcher',
  standalone: true,
  imports: [
    ChatRoomComponent
  ],
  templateUrl: './chat-launcher.component.html',
  styleUrl: './chat-launcher.component.scss'
})
export class ChatLauncherComponent{
  constructor(
    private userService:UserService,
    private chatService:ChatService,
    private router:Router,
    private http:HttpClient
  ){
    if(!this.userService.user){
      this.router.navigate(["/"]);
    }
  }
  serverAddress = "http://localhost:8080/getRooms"
  rooms?:any[]
  showChatroom:boolean = false;
  
  handleSubmit(event:Event){
    event.preventDefault();
    const selection:HTMLSelectElement|null = document.getElementById("chat-join") as HTMLSelectElement;
    switch(selection.value){
      case "new":
        this.handleCreateChat();
    }
  }

  handleCreateChat(){
    console.log("creating");
    const userData = {
      username: this.userService.user?.username,
      roomID: this.userService.user?.username
    }
    this.chatService.connectToRoom(userData as {username:string, roomID:string});
    this.showChatroom = true;
  }
  handleJoinChat(){
    console.log("joining");
  }
}
