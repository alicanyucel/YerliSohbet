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

  readonly loggedIn = signal(false);
  readonly usernameInput = signal('');
  readonly user = signal('');
  readonly message = signal('');
  readonly messages = this.chatService.messages;
  readonly connected = this.chatService.connected;
  readonly canSend = computed(() => this.message().trim().length > 0 && this.connected());

  async ngOnInit(): Promise<void> {
    await this.chatService.connect();
  }

  login(): void {
    const name = this.usernameInput().trim();
    if (!name) return;
    this.user.set(name);
    this.loggedIn.set(true);
  }

  logout(): void {
    this.loggedIn.set(false);
    this.user.set('');
    this.usernameInput.set('');
  }

  async send(): Promise<void> {
    const message = this.message().trim();
    if (!message) return;
    await this.chatService.sendMessage(this.user(), message);
    this.message.set('');
  }
}
