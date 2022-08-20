import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Room} from "../../services/chat/chat.service";

@Component({
  selector: 'app-forward',
  templateUrl: './forward.component.html',
  styleUrls: ['./forward.component.css']
})
export class ForwardComponent implements OnInit {
  @Input() rooms: Room[] | undefined;
  @Input() forwardMessage: any | undefined;
  @Input() isOpenForward: boolean = false;
  @Output() sendChat = new EventEmitter();
  @Output() closeForward = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  close() {
    this.closeForward.emit();
  }

  forwardChat(room: Room) {
    this.sendChat.emit(room);
  }
}
