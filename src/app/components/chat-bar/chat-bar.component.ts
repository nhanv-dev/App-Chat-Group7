import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-chat-bar',
  templateUrl: './chat-bar.component.html',
  styleUrls: ['../../home/home.component.css']
})
export class ChatBarComponent implements OnInit {
  public message: string = '';
  public icons: any[] = [];
  public isEmojiPickerVisible: boolean | undefined;
  @Output() sendChat = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  handleSendChat() {
    this.icons.forEach((icon: any) => {
      this.message = this.message.replace(icon.native, icon.unified);
    })
    this.sendChat.emit(this.message);
    this.message = '';
    this.icons = [];
  }

  toggleEmoji() {
    this.isEmojiPickerVisible = !this.isEmojiPickerVisible;
  }

  changeMessage(event: any) {
    this.icons = this.icons.filter((icon: any) => (icon.index <= event.length))
  }

  addEmoji(event: any) {
    if (event?.emoji?.native) {
      this.message += event.emoji.native;
      let icon = {
        index: this.message.length,
        native: event.emoji.native,
        unified: `&#x${event.emoji.unified};`,
      }
      this.icons.push(icon);
    }
  }
}
