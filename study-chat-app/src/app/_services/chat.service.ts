import { Injectable, inject } from '@angular/core';
import { io } from "socket.io-client";
import { Observable, Subscription, observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor() { }
  
  private socket = io("http://localhost:8080");
  private http = inject(HttpClient);
  rooms:[] = []
  
  async getAllRooms(){
    await this.http.get("http://localhost:8080/getRooms").subscribe(data=>{
      this.rooms = data as [];
    })
  }

  connectToWS(){
    this.socket.connect();
  }

  connectToRoom( userData: { username:string, roomID:string } ){
    const callback = ( msg:string )=>{
      console.log(msg);
      console.log("^^ normal if undefined");
    };
    const { username, roomID } = userData;
    this.socket.emit("joinRoom", { username, roomID }, callback );
  }
  
  getNotifications(){
    let notificationObservable = new Observable<string>( observer =>{
      this.socket.on("notification", ( msg )=>{
        console.log("got new ./notification in chat service!!");
        console.log(msg);
        
        observer.next(msg);
      })
      return () => this.socket.disconnect();
    });
    return notificationObservable;
  }

  sendMessage( messageData:{ msg:string, user:string|undefined } ){
    this.socket.emit(`message`, messageData);
  }

  getMessages(){
    let observable = new Observable<{ _id:string, msg:{ content:string }, user:string }>( observer => {
      this.socket.on("message", ( msg ) => {
        console.log("got new ~ message ~ in chat service!!");
        console.log(msg);
        observer.next(msg);
      });
      return () => this.socket.disconnect();
    })
    return observable;
  }

  disconnectChatConnection(){
    this.socket.disconnect();
  }
}
