import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Room} from "../../services/chat/chat.service";

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.css']
})
export class NewContactComponent implements OnInit {
  @Input() rooms: Room[] | undefined;
  @Output() addNewPeople = new EventEmitter<any>();
  @Output() joinRoom = new EventEmitter<any>();
  isOpened: boolean = false;
  isOpenedPeople: boolean = false;
  isOpenedGroup: boolean = false;
  public newContact: string = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  handleAddNewPeople() {
    this.addNewPeople.emit(this.newContact);
  }

  handleJoinRoom() {
    console.log(this.newContact)
    this.joinRoom.emit(this.newContact);
  }

  toggle() {
    this.isOpened = !this.isOpened;
  }

  close() {
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
