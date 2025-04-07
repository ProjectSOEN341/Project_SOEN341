import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DirectMessagesComponent } from './direct-messages.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  // Import CommonModule for standalone components

// Mock Client
class MockClient {
  activate = jasmine.createSpy('activate');
  deactivate = jasmine.createSpy('deactivate');
  publish = jasmine.createSpy('publish');
  subscribe = jasmine.createSpy('subscribe');
}

describe('DirectMessagesComponent', () => {
  let component: DirectMessagesComponent;
  let fixture: ComponentFixture<DirectMessagesComponent>;
  let mockClient: MockClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, CommonModule],  // Add CommonModule to imports
      declarations: [],  // Remove DirectMessagesComponent from declarations
    }).compileComponents();

    fixture = TestBed.createComponent(DirectMessagesComponent);
    component = fixture.componentInstance;

    // Replace the real client with a mock
    mockClient = new MockClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (component as any).client = mockClient;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should connect', () => {
    component.connect();
    expect(mockClient.activate).toHaveBeenCalled();
    expect(component.isConnected).toBeTrue();
  });

  it('should disconnect', () => {
    component.disconnect();
    expect(mockClient.deactivate).toHaveBeenCalled();
    expect(component.isConnected).toBeFalse();
  });

  it('should send a message', () => {
    component.isConnected = true;
    component.usernameReceive = 'Alice';
    component.usernameSend = 'Bob';
    component.singleMessage = 'Hello';
    component.sendName();

    expect(mockClient.publish).toHaveBeenCalledWith({
      destination: '/app/hello/Bob',
      body: jasmine.any(String),
    });
  });

  it('should handle incoming messages', () => {
    component.showGreeting('Test message');
    expect(component.messages).toContain('Test message');
  });
});
