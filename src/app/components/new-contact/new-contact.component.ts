import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Room} from "../../services/chat/chat.service";
import {MessageConvertService} from "../../services/message-convert/message-convert.service";

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.css']
})
export class NewContactComponent implements OnInit {
  @Input() activeRoom: Room | undefined;
  @Input() rooms: Room[] | undefined;
  @Output() addPeople = new EventEmitter<any>();
  @Output() createRoom = new EventEmitter<any>();
  @Output() joinRoom = new EventEmitter<any>();
  @Output() changeRoom = new EventEmitter<any>();
  isOpened: boolean = false;
  isOpenedPeople: boolean = false;
  isOpenedGroup: boolean = false;
  isNotification: boolean = false;
  data :string='';
  contentPeople: string='';
  contentGroup: string='';
  public newContact: string = '';

  constructor(public messageConverter: MessageConvertService) {
  }

  ngOnInit(): void {
  }

  handleChangeRoom(room: Room) {
    this.changeRoom.emit(room);
  }

  handleAddPeople() {
    this.data='';
    this.addPeople.emit(this.newContact);
  }

  handleCreateRoom() {
    this.data='';
    this.createRoom.emit(this.newContact);
    console.log(this.newContact);
  }

  handleJoinRoom() {
    this.joinRoom.emit(this.newContact);
  }

  toggle() {
    this.isOpened = !this.isOpened;
  }

  close() {
    this.data='';
    this.isOpenedPeople = false;
    this.isOpenedGroup = false;
  }

  toggleAddPeople() {
    this.isOpened = !this.isOpened;
    this.isOpenedPeople = !this.isOpenedPeople;
  }

  toggleAddGroup() {
    this.isOpened = !this.isOpened;
    this.isOpenedGroup = !this.isOpenedGroup;
  }

}
