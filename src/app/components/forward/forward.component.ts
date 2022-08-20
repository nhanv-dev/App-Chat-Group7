import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Room} from "../../services/chat/chat.service";
import {BoxChatComponent} from "../box-chat/box-chat.component";

@Component({
  selector: 'app-forward',
  templateUrl: './forward.component.html',
  styleUrls: ['./forward.component.css']
})
export class ForwardComponent implements OnInit {

  @Input() rooms: Room[] | undefined;
  @Input() content :any |undefined;
  @Output() sendChat = new EventEmitter();
  @Input() isOpenForward: boolean=false;
  @Output() closeForward = new EventEmitter();


  constructor() {
  }

  ngOnInit(): void {
  }


  close() {
    this.closeForward.emit();
  }
  forwardChat(room: Room){
    this.sendChat.emit(room);




  // console.log(number);
  //   console.log("this is forward"+this.content);
  //   console.log(this.rooms?.length);
  }


}
