import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private readonly chatService = inject(ChatService);

  readonly user = signal('');
  readonly message = signal('');
  readonly messages = this.chatService.messages;
  readonly connected = this.chatService.connected;
  readonly canSend = computed(() => this.user().trim().length > 0 && this.message().trim().length > 0 && this.connected());

  async ngOnInit(): Promise<void> {
    await this.chatService.connect();
  }

  async send(): Promise<void> {
    const user = this.user().trim();
    const message = this.message().trim();

    if (!user || !message) {
      return;
    }

    await this.chatService.sendMessage(user, message);
    this.message.set('');
  }
}
