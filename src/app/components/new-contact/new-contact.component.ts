import {Component, Input, OnInit} from '@angular/core';
import {Room} from "../../services/chat/chat.service";

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.css']
})
export class NewContactComponent implements OnInit {
  @Input() rooms: Room[] | undefined;
  isOpened: boolean = false;
  isOpenedPeople: boolean = false;
  isOpenedGroup: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
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
