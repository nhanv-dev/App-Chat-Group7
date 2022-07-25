import {Component, Input, OnInit} from '@angular/core';
import {Message, Room, User} from "../../home/home.component";


@Component({
  selector: 'app-box-chat',
  templateUrl: './box-chat.component.html',
  styleUrls: ['./box-chat.component.css', '../../home/home.component.css']
})
export class BoxChatComponent implements OnInit {
  @Input() user: User | undefined;
  @Input() room: Room | undefined;

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.room)
  }

}
