import { Injectable, signal } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { ChatMessage } from '../models/chat-message';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private hubConnection: HubConnection | null = null;
  readonly connected = signal(false);
  readonly messages = signal<ChatMessage[]>([]);

  async connect(): Promise<void> {
    if (this.hubConnection && this.hubConnection.state !== 'Disconnected') {
      return;
    }

    this.hubConnection = new HubConnectionBuilder()
      .withUrl('/hubs/chat')
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    this.hubConnection.on('ReceiveMessage', (user: string, message: string, sentAt: string) => {
      this.messages.update((items) => [...items, { user, message, sentAt }]);
    });

    this.hubConnection.onclose(() => {
      this.connected.set(false);
    });

    await this.hubConnection.start();
    this.connected.set(true);
  }

  async sendMessage(user: string, message: string): Promise<void> {
    if (!this.hubConnection || this.hubConnection.state !== 'Connected') {
      return;
    }

    await this.hubConnection.invoke('SendMessage', user, message);
  }
}
