import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {ChatService, Room} from "../../services/chat/chat.service";

@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.component.html',
  styleUrls: ['./group-chat.component.css', '../../home/home.component.css']
})
export class GroupChatComponent implements OnInit {
  @Input() rooms: Room[] | undefined;
  @Input() activeRoom: Room | undefined;
  @Input() searching: string = '';
  @Output() changeRoom = new EventEmitter<any>();
  type: string = 'direct';

  constructor() {
  }

  ngOnInit(): void {
  }

  filterRoom(room: Room): boolean {
    if (room.type === this.type || this.type === 'direct') {
      return room.name?.includes(this.searching) || !this.searching
    }
    return false;
  }

  connectChat(room: Room) {
    this.changeRoom.emit(room);
  }
}
