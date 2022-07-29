import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-button-add',
  templateUrl: './button-add.component.html',
  styleUrls: ['./button-add.component.css']
})
export class ButtonAddComponent implements OnInit {
  public isOpened: boolean = false

  constructor() {
  }

  ngOnInit(): void {
  }

  toggle() {
    this.isOpened = !this.isOpened;
  }

  toggleAddGroup() {
    this.isOpened = !this.isOpened;
  }
  toggleAddPeople() {
    this.isOpened = !this.isOpened;
  }

}
