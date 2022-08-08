import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-chat-bar',
  templateUrl: './chat-bar.component.html',
  styleUrls: ['../../home/home.component.css']
})
export class ChatBarComponent implements OnInit {
  constructor() {
  }
  ngOnInit(): void {
  }

  sendChat() {
    alert('send chat')
  }

  
  public textChat: string = '';
  public isEmojiPickerVisible: boolean | undefined;
  public addEmoji(event: { emoji: { native: any; }; }) {
    this.textChat = `${this.textChat}${event.emoji.native}`;
    this.isEmojiPickerVisible = false;
  }

  addEmoji(event: any) {
    this.message += `${event?.emoji?.native}`;
  }
}
