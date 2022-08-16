import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {DarkModeService} from "angular-dark-mode";
import {User} from "../../services/chat.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css', '../../home/home.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() user: User | undefined;
  @Output() logout = new EventEmitter<any>();
  @Input() showSidebar: boolean = true;
  @Input() toggle: any;
  darkMode$ = this.darkModeService.darkMode$;

  constructor(private darkModeService: DarkModeService) {
  }

  ngOnInit(): void {
  }


  handleLogout(): void {
    this.logout.emit();
  }
  onToggle(): void {
    this.darkModeService.toggle();
  }
}
