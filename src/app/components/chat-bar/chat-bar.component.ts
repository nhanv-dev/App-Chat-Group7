import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Message} from "../../services/chat/chat.service";

@Component({
  selector: 'app-chat-bar',
  templateUrl: './chat-bar.component.html',
  styleUrls: ['../../home/home.component.css']
})
export class ChatBarComponent implements OnInit {
  public message: string = '';
  public isEmojiPickerVisible: boolean | undefined;
  @Output() sendChat = new EventEmitter();
  public images: any = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  handleSendChat() {
    this.sendChat.emit(this.message);
    this.message = '';
  }

  toggleEmoji() {
    this.isEmojiPickerVisible = !this.isEmojiPickerVisible;
  }

  public addEmoji(event: any) {
    if (event?.emoji?.native) this.message += event.emoji.native;
  }

  public chooseFile(event: any) {
    if (event.target.files) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.images.push({
          id: this.images.length,
          url: event.target.result
        });
      };
    };
  };

  public removeFile(id: any) {
    this.images = this.images.filter((image: any) => image.id !== id);
  }
}
