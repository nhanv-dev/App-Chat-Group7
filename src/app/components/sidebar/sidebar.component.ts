import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../services/chat.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css', '../../home/home.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() user: User | undefined;
  @Output() logout = new EventEmitter<any>();
  @Input() toggle: any;
  constructor() {
  }

  ngOnInit(): void {
    console.log(this.toggle)
  }


  handleLogout(): void {
    this.logout.emit();
  }
}
