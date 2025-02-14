import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Client, Message } from '@stomp/stompjs';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-direct-messages',
  imports: [FormsModule],
  templateUrl: './direct-messages.component.html',
  styleUrl: './direct-messages.component.css',
})
export class DirectMessagesComponent {
  private client: Client;
  messages: string[] = [];
  username: string = '1';
  isConnected: boolean = false;
  singleMessage: string = '';

  constructor() {
    this.client = new Client({
      brokerURL: 'ws://localhost:8080/gs-guide-websocket',
    });
    this.client.onConnect = (frame) => {
      console.log('Connected: ' + frame);
      this.subcribe();
    };
  }

  setAlice() {
    this.username = '1';
    console.log('setting to alice');
  }

  setBob() {
    this.username = '2';
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
      this.client.publish({
        destination: `/app/hello/${this.username}`,
        body: JSON.stringify({ name: this.singleMessage }),
      });
    }
  }

  showGreeting(message: string) {
    this.messages.push(message);
  }

  subcribe() {
    this.client.subscribe(`/topic/greetings/${this.username}`, (greeting) => {
      this.showGreeting(JSON.parse(greeting.body).content);
    });
  }
}
