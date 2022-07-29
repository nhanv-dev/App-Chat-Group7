import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../home/home.component";

@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.component.html',
  styleUrls: ['./group-chat.component.css', '../../home/home.component.css']
})
export class GroupChatComponent implements OnInit {
  @Input() groups: User[] | undefined;
  @Input() connected: User | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

  public connectChat(name: string, type: string) {
  }

}
