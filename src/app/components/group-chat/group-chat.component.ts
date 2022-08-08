import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ChatService, Room} from "../../services/chat.service";

@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.component.html',
  styleUrls: ['./group-chat.component.css', '../../home/home.component.css']
})
export class GroupChatComponent implements OnInit {
  @Input() rooms: Room[] | undefined;
  @Input() activeRoom: Room | undefined;
  @Output() changeRoom = new EventEmitter<any>();

  constructor(private chatService: ChatService) {

  }

  ngOnInit(): void {

  }

  connectChat(room: Room) {
    this.changeRoom.emit(room);
  }

}
