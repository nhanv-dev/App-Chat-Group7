import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-chat-bar',
  templateUrl: './chat-bar.component.html',
  styleUrls: ['./chat-bar.component.css']
})
export class ChatBarComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {

  }

  public textChat: string = '';
  public isEmojiPickerVisible: boolean | undefined;

  public addEmoji(event: { emoji: { native: any; }; }) {
    this.textChat = `${this.textChat}${event.emoji.native}`;
    this.isEmojiPickerVisible = false;
  }

}
