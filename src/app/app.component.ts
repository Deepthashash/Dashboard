import {Component, OnInit} from '@angular/core';
import {WebSocketService} from './web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  datas = [];

  constructor(private webSocketService: WebSocketService) {
  }

  ngOnInit(): void {
    this.webSocketService.connect().subscribe(
      () => {
        console.log('WebSocket connected');
        this.webSocketService.subscribe('/topic/my-topic').subscribe(
          (message) => {
            console.log('Received message:', message);
            this.datas.push(message);
          },
          (error) => {
            console.error('WebSocket error:', error);
          }
        );
      },
      (error) => {
        console.error('WebSocket connection error:', error);
      }
    );
    setInterval(() => {
      this.sendMessage();
    }, 3000);
  }

  sendMessage(): void {
    const destination = '/topic/my-topic';
    const message = 'Ping';
    this.webSocketService.sendMessage(destination, message);
  }
}
