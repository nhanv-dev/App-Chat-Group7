import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SidebarComponent} from "../sidebar/sidebar.component";
import {style} from "@angular/animations";

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
  public images: any = [];
  style :String ="";

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
    let nameClass = document.getElementsByTagName('body')[0].classList.value;
    this.style=nameClass;
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
  check(){
    if(this.style==="dark-mode"){
      return true;
    }else {
      return false;
    }
  }
}
