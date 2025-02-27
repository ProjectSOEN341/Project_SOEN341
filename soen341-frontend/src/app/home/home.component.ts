import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Client } from '@stomp/stompjs';
import { UserService } from '../services/userService.service';
import { FormsModule } from '@angular/forms';
import { Message } from '../../interfaces/message';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Conversation } from '../../interfaces/conversation';
import { Channel } from '../../interfaces/channel';
import { ChannelMessage } from '../../interfaces/channelMessage';

@Component({
  selector: 'app-home',
  imports: [CommonModule, MatButtonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  private client: Client;
  url='http://localhost:8088/api/v1'
  messages: Message[] = [];
  singleMessage: string = '';
  message!: Message;
  newConversationReceiver='';
  selectedConversation!:Conversation;

   constructor(
    public userService:UserService,
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
      this.http.get<Conversation[]>('http://localhost:8088/api/v1/direct-message/'+this.userService.loginUser.email).subscribe((conversations)=>this.conversations=conversations);
      this.http.get<Channel[]>('http://localhost:8088/api/v1/channel/retrieveAllChannel').subscribe((channels)=>this.channels=channels);
    }

  view: 'channels' | 'dms' = 'channels';
  channels: Channel[] = [];
  dms = [
    { name: 'Thomas', messages: [{ user: 'Thomas', text: 'Hey, how are you?' }] },
    { name: 'Robert', messages: [{ user: 'Robert', text: "What's up?" }] },
  ];
  conversations:Conversation[]=[];

  selectedChannel!: Channel;
  newMessage = '';

  subcribe() {
    this.client.subscribe(`/topic/greetings/${this.userService.loginUser.email}`, (m) => {
      this.showGreeting(JSON.parse(m.body));
    });
    this.client.subscribe(`/topic/dm/${this.userService.loginUser.email}`, (m) => {
      this.showConversation(JSON.parse(m.body));
    });
    this.client.subscribe('/topic/channel', (m)=>{
      this.showChannelMessage(JSON.parse(m.body));
    });

    this.client.subscribe('/topic/channel/newChannels', (m)=>{
      this.showChannel(JSON.parse(m.body));
    });
  }

  showChannel(channel: Channel){
    channel.channelMessages = [];
    console.log(channel);
    this.channels.push(channel);
  }

  showChannelMessage(channelMessage: ChannelMessage){
    console.log(channelMessage);
    console.log("jejajjajajaj");
    if (channelMessage.channelId == this.selectedChannel.id) {
      this.selectedChannel.channelMessages.push(channelMessage);
    } else {
      this.channels.forEach((channel)=>{
        if(channel.id == channelMessage.channelId) {
          channel.channelMessages.push(channelMessage);
        }
      })
    }
    
  }

  createChannel():void{
    const newChannel = {
      name: this.newConversationReceiver
    }

    this.client.publish({
      destination: `/app/channel/createInApp`,
      body: JSON.stringify(
        newChannel
      ),
    });
  }

  sendName() {
    if (this.view == "dms") {
      console.log('trying to send: ' + this.singleMessage);
      const receiver=this.selectedConversation.user1==this.userService.loginUser.email?this.selectedConversation.user2:this.selectedConversation.user1;
      this.message = {
        sender: this.userService.loginUser.email,
        receiver: receiver,
        body: this.singleMessage,
        timestamp: new Date().toLocaleString(),
      }
      
      this.client.publish({
        destination: `/app/hello/${receiver}`,
        body: JSON.stringify(this.message),
      });
      this.selectedConversation.messages.push(this.message);
    } else {
      console.log('trying to send: ' + this.singleMessage);

      this.client.publish({
        destination: `/app/channel/sendMessage`,
        body: JSON.stringify({
          sender: this.userService.loginUser.email,
          body: this.singleMessage,
          timestamp: new Date().toLocaleString(),
          channelId: this.selectedChannel.id
        }),
      });
    }
    
    
  }
  showConversation(convo:Conversation){
    this.conversations.push(convo);
    }
  showGreeting(message: Message) {
    const otherPerson=this.selectedConversation.user1==this.userService.loginUser.email?this.selectedConversation.user2:this.selectedConversation.user1;
    if(message.sender==otherPerson){
      this.selectedConversation.messages.push(message);
    }
    else{
      this.conversations.forEach((convo)=>{
        const convoPerson=convo.user1==this.userService.loginUser.email?convo.user2:convo.user1;
        if(convoPerson==message.sender){
          convo.messages.push(message);
        }
      })

      }
    }
    
    
  hasJoinedChannel: Boolean = false;

  selectChannel(channel: Channel) {
    this.selectedChannel = channel;
    this.http.get<Boolean>('http://localhost:8088/api/v1/participant/hasJoined/' + this.selectedChannel.id + "/" + this.userService.loginUser.email).subscribe((joined)=>this.hasJoinedChannel = joined);
    console.log(this.hasJoinedChannel);
  }
  createConversation():void{
    const newConversation:Conversation = {
      id: 1,
      user1: this.userService.loginUser.email,
      user2: this.newConversationReceiver,
      role:"",
      messages:[]
    };
    this.client.publish({
      destination: `/app/dm/${this.newConversationReceiver}`,
      body: JSON.stringify(newConversation),
    });
    
    
    this.http.post('http://localhost:8088/api/v1/direct-message/dm/createConversation', newConversation, {
      headers: { 'Content-Type': 'application/json' }
    })
    .subscribe(response => {
      console.log('Conversation created successfully', response);
    }, error => {
      console.error('Error creating conversation', error);
    });
    setTimeout(() => {
      this.http.get<Conversation[]>('http://localhost:8088/api/v1/direct-message/'+this.userService.loginUser.email).subscribe((conversations)=>this.conversations=conversations);
  }, 2000);
  
    

  }
  selectConversation(selectedConversation:Conversation):void{
    this.selectedConversation=selectedConversation;
    
  }

  
  joinChannel():void {
    this.http.post('http://localhost:8088/api/v1/participant/addParticipantToChannel/' + this.selectedChannel.id + "/" + this.userService.loginUser.email, null).subscribe(response => {
      console.log('Conversation created successfully', response);
    }, error => {
      console.error('Error creating conversation', error);
    });;
    this.hasJoinedChannel = true;
  }
  
}
