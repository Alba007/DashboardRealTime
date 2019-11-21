import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { Observable } from 'rxjs';
import { DialogServerService } from '../app/dialog-server.service'
import { ReloadService } from './reload.service';
import { JsonPipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private serverUrl = 'http://localhost:8080/socket'
  private title = 'WebSockets';
  public  stompClient;
  constructor(private dialogServ: DialogServerService,
              private reloadServ: ReloadService) 
   {
        this.initializeWebSocketConnection() ;
   }
 //krijon lidhjen me serverin
   initializeWebSocketConnection() {
     let ws = new SockJS(this.serverUrl);
     this.stompClient = Stomp.over(ws);
     this.stompClient.connect({}, (frame)=> {
       this.stompClient.subscribe("/send/sensor", (message) => {
         var mess=JSON.parse(message.body)
         this.reloadServ.callComponentMethod(mess) ;
       });
    });
  }

}
