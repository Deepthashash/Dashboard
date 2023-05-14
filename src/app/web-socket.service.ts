import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as Stomp from 'webstomp-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient: Stomp.Client;

  constructor() { }

  public connect(): Observable<any> {
    const socket = new WebSocket('ws://your-websocket-url');
    this.stompClient = Stomp.over(socket);
    return new Observable(observer => {
      this.stompClient.connect({}, () => {
        observer.next('Connected');
      }, (error) => {
        observer.error(error);
      });
    });
  }

  public subscribe(destination: string): Observable<any> {
    return new Observable(observer => {
      this.stompClient.subscribe(destination, (message) => {
        observer.next(message.body);
      });
    });
  }

  public sendMessage(destination: string, message: string): void {
    this.stompClient.send(destination, message);
  }
}
