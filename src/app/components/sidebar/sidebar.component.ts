import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../home/home.component";
import {ChatService} from "../../services/chat.service";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {DarkModeService} from "angular-dark-mode";


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css', '../../home/home.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() user: User | undefined;
  @Output() logout = new EventEmitter<any>();
  @Input() toggle: any;
  darkMode$ = this.darkModeService.darkMode$;

  constructor(private darkModeService: DarkModeService) {
  }

  ngOnInit(): void {
    console.log(this.toggle)
  }


  handleLogout(): void {
    this.logout.emit();
  }
  onToggle(): void {
    this.darkModeService.toggle();
  }
}
