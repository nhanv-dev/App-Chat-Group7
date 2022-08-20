import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FirebaseService} from "../../services/firebase/firebase.service";
import {UploadState} from "../upload-file/upload-file.component";

@Component({
  selector: 'app-chat-bar',
  templateUrl: './chat-bar.component.html',
  styleUrls: ['./chat-bar.component.css']
})
export class ChatBarComponent implements OnInit {
  public message: string = '';
  public icons: any[] = [];
  public isEmojiPickerVisible: boolean | undefined;
  @Output() sendChat = new EventEmitter();
  public images: any = [];
  public isUpload: UploadState = {status: false};
  private countImage: number = 0;
  style: String = "";

  constructor(private firebaseService: FirebaseService) {
  }

  ngOnInit(): void {
  }

  async handleSendChat() {
    if (this.images.length > 0) {
      this.isUpload = {status: true};
    } else {
      await this.sendMessage();
    }
  }

  async sendMessage() {
    if (this.message) {
      this.icons.forEach((icon: any) => this.message = this.message.replace(icon.native, icon.unified))
      this.sendChat.emit(this.message);
      this.reset();
    }
  }

  async sendImage(image: any) {
    if (image.downloadURL) {
      this.countImage++;
      const html = `<img src='${image.downloadURL}' alt="send image">`
      await this.sendChat.emit(html);
      if (this.countImage >= this.images.length) this.images = [];
      if (this.images.length <= 0) await this.sendMessage();
    }
  }

  reset() {
    this.message = '';
    this.icons = [];
    this.images = [];
  }

  chooseFile(event: any) {
    if (event.target.files) {
      const images = event.target.files;
      Array.from(images).forEach((file: any) => {
        const image = {file}
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event: any) => {
          this.images.push({...image, url: event.target.result})
        }
      })
    }
  }

  removeImage(image: any) {
    this.images = this.images.filter((item: any) => {
      return item !== image
    });
  }

  addEmoji(event: any) {
    if (event?.emoji?.native) {
      let icon = {
        begin: this.message.length,
        end: this.message.length + event.emoji.native.length,
        native: event.emoji.native,
        unified: `&#x${event.emoji.unified.split('-')[0]};`,
      }
      this.message += event.emoji.native;
      console.log(icon, this.message.substring(icon.begin, icon.end))
      this.icons.push(icon);
    }
  }

  toggleEmoji() {
    this.isEmojiPickerVisible = !this.isEmojiPickerVisible;
    this.style = document.getElementsByTagName('body')[0].classList.value;
  }

  changeMessage(event: any) {
    this.icons = this.icons.filter((icon: any) => {
      return event.substring(icon.begin, icon.end) === icon.native;
    })
  }
}
