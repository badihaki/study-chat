import { Component, OnInit } from '@angular/core';
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
export class ChatLauncherComponent implements OnInit{
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
  
  ngOnInit(): void {
    this.getRooms();
  }
  
  async getRooms(){
    await this.chatService.getAllRooms();
    this.rooms = this.chatService.rooms;
  }
  
  handleSubmit(event:Event){
    event.preventDefault();
    const selection:HTMLSelectElement|null = document.getElementById("chat-join") as HTMLSelectElement;
    if(selection.value === "new"){
      this.handleJoinChat(this.userService.user?.username as string);
      this.userService.currentChatRoom = this.userService.user?.username;
    }
    else{
      this.handleJoinChat(selection.value);
      this.userService.currentChatRoom = selection.value;
    }
    
  }

  handleJoinChat(room:string){
    console.log(`joining ${room}`);
    const userData = {
      username: this.userService.user?.username,
      roomID: room
    }
    this.chatService.connectToRoom(userData as {username:string, roomID:string});
    this.showChatroom = true;
  }

  handleLeave(){
    this.chatService.disconnectChatConnection();
    this.userService.currentChatRoom = undefined;
    this.showChatroom = false;
  }
}
