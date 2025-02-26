import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Client } from '@stomp/stompjs';

@Component({
  selector: 'app-home',
  imports: [CommonModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  private client: Client;
   constructor() {
      this.client = new Client({
        brokerURL: 'ws://localhost:8088/api/v1/dm/gs-guide-websocket', 
      });
      this.client.onConnect = (frame) => {
        console.log('Connected: ' + frame);
        // this.subcribe();
      };
    }

  view: 'channels' | 'dms' = 'channels';
  channels = [
    { name: 'General', messages: [{ user: 'Thomas', text: 'Hello!' }] },
    { name: 'Project Help', messages: [{ user: 'Andy', text: 'I need help with the frontend!' }] },
    { name: 'Social', messages: [{ user: 'Robert', text: 'Hello!' }] },
  ];
  dms = [
    { name: 'Thomas', messages: [{ user: 'Thomas', text: 'Hey, how are you?' }] },
    { name: 'Robert', messages: [{ user: 'Robert', text: "What's up?" }] },
  ];

  selectedChannel = this.channels[0];
  newMessage = '';

  // subcribe() {
  //   this.client.subscribe(`/dm/topic/greetings/${this.usernameReceive}`, (m) => {
  //     this.showGreeting(JSON.parse(m.body).body);
  //   });
  // }
  selectChannel(channel: any) {
    this.selectedChannel = channel;
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.selectedChannel.messages.push({ user: 'You', text: this.newMessage });
      this.newMessage = '';
    }
  }

}
