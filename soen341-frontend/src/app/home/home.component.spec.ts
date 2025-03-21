import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { UserService } from '../services/userService.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

class MockUserService {
  loginUser = { email: 'test@example.com' };
  user = { role: 'member' };
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let userService: MockUserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HomeComponent],
      providers: [
        { provide: UserService, useClass: MockUserService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty messages and newMessage', () => {
    expect(component.messages).toEqual([]);
    expect(component.newMessage).toBe('');
  });

  it('should create a new channel', () => {
    spyOn(component['client'], 'publish');
    component.newConversationReceiver = 'TestChannel';
    component.createChannel();
    expect(component['client'].publish).toHaveBeenCalled();
    expect(component.newConversationReceiver).toBe('');
  });

  it('should send a message', () => {
    spyOn(component['client'], 'publish');
    component.singleMessage = 'Hello!';
    component.view = 'channels';
    component.selectedChannel = { id: 1, name: 'TestChannel', channelMessages: [] };
    component.sendName();
    expect(component['client'].publish).toHaveBeenCalled();
    expect(component.singleMessage).toBe('');
  });

  it('should select a conversation', () => {
    const conversation = { id: 1, user1: 'test@example.com', user2: 'user2', role: 'user', messages: [] };
    component.selectConversation(conversation);
    expect(component.selectedConversation).toEqual(conversation);
  });
});
