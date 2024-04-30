import { Injectable } from '@angular/core';
import { io } from "socket.io-client";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor() { }
  
  private socket = io("http://localhost:8080");

  sendMessage( messageData:{ msg:string, user:string|undefined } ){
    this.socket.emit(`message`, messageData);
  }

  getMessages(){
    let observable = new Observable<{ _id:string, content:string, user:string }>( observer => {
      this.socket.on("message", ( msg ) => {
        console.log("got new message in service!!")
        console.log(msg);
        observer.next(msg);
      });
      return () => this.socket.disconnect();
    })
    return observable;
  }

  disconnect(){
    this.socket.emit("disconnect");
  }
}
