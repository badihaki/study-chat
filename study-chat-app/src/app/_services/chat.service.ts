import { Injectable } from '@angular/core';
import { io } from "socket.io-client";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor() { }
  
  private socket = io("http://localhost:8080");

  sendMessage( msg:{content:string} ){
    this.socket.emit(`message`, msg);
  }

  getMessages(){
    let observable = new Observable<{ _id:string, content:string }>( observer => {
      this.socket.on("getMsg", ( data ) => {
        observer.next(data);
      });
      return () => this.socket.disconnect();
    })
    return observable;
  }
}
