import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Client } from '@stomp/stompjs';
import { UserService } from '../services/userService.service';
import { FormsModule } from '@angular/forms';
import { Message } from '../../interfaces/message';
import { HttpClient } from '@angular/common/http';
import { Conversation } from '../../interfaces/conversation';

@Component({
  selector: 'app-home',
  imports: [CommonModule, MatButtonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  private client: Client;
  url='http://localhost:8088/api/v1'
  messages: string[] = [];
  singleMessage: string = '';
  message!: Message;
  newConversationReceiver='';
   constructor(
    private userService:UserService,
    private http: HttpClient
   ) {
      this.client = new Client({
        brokerURL: 'ws://localhost:8088/api/v1/dm/gs-guide-websocket', 
      });
      this.client.onConnect = (frame) => {
        console.log('Connected: ' + frame);
        this.subcribe();
      };
      this.client.activate();
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
  conversations=["hello","swikjndf","wjeuhfn"]

  selectedChannel = this.channels[0];
  newMessage = '';

  subcribe() {
    this.client.subscribe(`/dm/topic/greetings/${this.userService.loginUser.email}`, (m) => {
      this.showGreeting(JSON.parse(m.body).body);
    });
  }
  sendName() {
    
    console.log('trying to send: ' + this.singleMessage);
    
      this.message = {
        sender: this.userService.loginUser.email,
        receiver: "johnny",
        body: this.singleMessage,
        timestamp: new Date().toLocaleString(),
      }
      this.client.publish({
        destination: `/app/hello/${"johnny"}`,
        body: JSON.stringify(this.message),
      });
    
  }
  showGreeting(message: string) {
    this.messages.push(message);
    
  }
  selectChannel(channel: any) {
    this.selectedChannel = channel;
  }
  createConversation():void{
    const newConversation:Conversation = {
      id: 1,
      user1: this.userService.loginUser.email,
      user2: this.newConversationReceiver,
      role:"",
      messages:[]
    };
    
    
      this.http.post('http://localhost:8088/api/v1/direct-message/dm/createConversation', newConversation, {
      })

  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.selectedChannel.messages.push({ user: 'You', text: this.newMessage });
      this.newMessage = '';
    }
  }

}
