import { Injectable, inject } from '@angular/core';
import { io } from "socket.io-client";
import { Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor() { }
  
  private socket = io("http://localhost:8080");
  private http = inject(HttpClient);
  
  getAllRooms():Subscription{
    return this.http.get("http://localhost:8080/getRooms").subscribe(data=>{
      console.log("room data: ");
      console.log(data);
      return(data);
    })
  }

  connectToRoom( userData: { username:string, roomID:string } ){
    const callback = ( err:{error:string} )=>{
      console.log(err);
    };
    const { username, roomID } = userData;
    this.socket.emit("joinRoom", { username, roomID }, callback )
  }

  sendMessage( messageData:{ msg:string, user:string|undefined } ){
    this.socket.emit(`message`, messageData);
  }

  getMessages(){
    let observable = new Observable<{ _id:string, msg:{ content:string }, user:string }>( observer => {
      this.socket.on("message", ( msg ) => {
        console.log("got new message in service!!")
        console.log(msg);
        observer.next(msg);
      });
      // return () => this.socket.disconnect();
    })
    return observable;
  }

  disconnectChatConnection(){
    // this.socket.emit("disconnect");
    this.socket.disconnect();
  }
}
