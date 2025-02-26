import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Client } from '@stomp/stompjs';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Message } from '../../interfaces/message';

@Component({
  selector: 'app-direct-messages',
  imports: [FormsModule],
  templateUrl: './direct-messages.component.html',
  styleUrl: './direct-messages.component.css',
})
export class DirectMessagesComponent {
  private client: Client;
  messages: string[] = [];
  usernameReceive: string = '';
  usernameSend: string = '';
  isConnected: boolean = false;
  singleMessage: string = '';
  message!: Message;

  constructor() {
    this.client = new Client({
      brokerURL: 'ws://localhost:8088/api/v1/dm/gs-guide-websocket', 
    });
    this.client.onConnect = (frame) => {
      console.log('Connected: ' + frame);
      this.subcribe();
    };
  }

  setAliceReceive() {
    this.usernameReceive = '1';
    console.log('setting to alice');
  }

  setBobReceive() {
    this.usernameReceive = '2';
    console.log('setting to bob');
  }
  setAliceSend() {
    this.usernameSend = '1';
    console.log('setting to alice');
  }

  setBobSend() {
    this.usernameSend = '2';
    console.log('setting to bob');
  }
  connect() {
    this.client.activate();
    this.isConnected = true;
    console.log('Connected');
  }
  disconnect() {
    this.client.deactivate();
    this.isConnected = false;
    console.log('Disconnected');
  }
  sendName() {
    
    console.log('trying to send: ' + this.singleMessage);
    if (this.isConnected) {
      this.message = {
        sender: this.usernameReceive,
        receiver: this.usernameSend,
        body: this.singleMessage,
        timestamp: new Date().toLocaleString(),
      }
      this.client.publish({
        destination: `/app/hello/${this.usernameSend}`,
        body: JSON.stringify(this.message),
      });
    }
  }

  showGreeting(message: string) {
    this.messages.push(message);
  }

  subcribe() {
    this.client.subscribe(`/topic/greetings/${this.usernameReceive}`, (m) => {
      this.showGreeting(JSON.parse(m.body).body);
    });
  }
}
