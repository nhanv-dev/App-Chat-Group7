import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-chat-bar',
  templateUrl: './chat-bar.component.html',
  styleUrls: ['../../home/home.component.css']
})
export class ChatBarComponent implements OnInit {
  public message: string = '';
  public isEmojiPickerVisible: boolean | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

  sendChat() {
    alert('send chat')
  }

  toggleEmoji() {

  }

  public addEmoji(event: { emoji: { native: any; }; }) {
    this.message = `${this.message}${event.emoji.native}`;
    this.isEmojiPickerVisible = false;
  }
}
