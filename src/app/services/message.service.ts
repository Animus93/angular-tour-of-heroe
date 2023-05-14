import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: string[] = [];
  add(NewMessage: string) {
    this.messages.push(NewMessage);
  }
  clear() {
    this.messages = [];
  }
}
